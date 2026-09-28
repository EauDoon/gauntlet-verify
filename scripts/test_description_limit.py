"""The skill listing budget is under 450 characters. check_skill must enforce it."""

import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_limit", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def length_errors(description):
    mod = load_mod()
    root = Path(tempfile.mkdtemp())
    try:
        skill_dir = root / ".claude" / "skills" / "gauntlet-verify"
        skill_dir.mkdir(parents=True)
        text = (
            "---\nname: gauntlet-verify\ndescription: "
            + json.dumps(description)
            + "\n---\n\n# Title\n"
        )
        (skill_dir / "SKILL.md").write_text(text, encoding="utf-8")
        old = mod.ROOT
        mod.ROOT = root
        errors = []
        try:
            mod.check_skills(errors)
        finally:
            mod.ROOT = old
        return [e for e in errors if "450" in e]
    finally:
        shutil.rmtree(root)


class DescriptionLimitTest(unittest.TestCase):
    def test_449_characters_passes(self):
        self.assertEqual(length_errors("a" * 449), [])

    def test_450_characters_fails(self):
        errors = length_errors("b" * 450)
        self.assertTrue(errors, "a 450-character description was accepted")
        self.assertIn("under 450", errors[0])


if __name__ == "__main__":
    unittest.main()
