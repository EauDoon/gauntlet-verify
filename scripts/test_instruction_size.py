"""SKILL.md instructions must fit the part of a skill that survives compaction."""

import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
FRONT = '---\nname: gauntlet-verify\ndescription: "test"\n---\n'


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_size", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def size_errors(text):
    mod = load_mod()
    root = Path(tempfile.mkdtemp())
    try:
        skill_dir = root / ".claude" / "skills" / "gauntlet-verify"
        skill_dir.mkdir(parents=True)
        (skill_dir / "SKILL.md").write_text(text, encoding="utf-8")
        old = mod.ROOT
        mod.ROOT = root
        errors = []
        try:
            mod.check_skills(errors)
        finally:
            mod.ROOT = old
        return [e for e in errors if "survive compaction" in e]
    finally:
        shutil.rmtree(root)


def padded(total, tail=""):
    filler = "x" * (total - len(FRONT.encode("utf-8")) - 1)
    return FRONT + filler + "\n" + tail


class InstructionSizeTest(unittest.TestCase):
    def test_under_the_budget_passes(self):
        self.assertEqual(size_errors(padded(19999)), [])

    def test_at_the_budget_fails(self):
        errors = size_errors(padded(20000))
        self.assertTrue(errors, "20,000 bytes of instructions were accepted")
        self.assertIn("20000 bytes", errors[0])

    def test_the_eval_section_does_not_count(self):
        self.assertEqual(size_errors(padded(19999, "## Eval\n\n" + "y" * 5000 + "\n")), [])

    def test_multibyte_characters_count_as_bytes(self):
        text = FRONT + "é" * 10000 + "\n"
        self.assertTrue(size_errors(text), "UTF-8 bytes, not characters, are the budget")

    def test_the_shipped_skill_fits(self):
        text = (REPO / ".claude" / "skills" / "gauntlet-verify" / "SKILL.md").read_text(encoding="utf-8")
        self.assertEqual(size_errors(text), [])


if __name__ == "__main__":
    unittest.main()
