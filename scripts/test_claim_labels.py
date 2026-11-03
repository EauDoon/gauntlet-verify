"""README verification labels must use the skill's tier rule."""

import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SKILL_REL = Path(".claude") / "skills" / "gauntlet-verify" / "SKILL.md"
README = (REPO / "README.md").read_text(encoding="utf-8")
SKILL = (REPO / SKILL_REL).read_text(encoding="utf-8")


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_labels", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def label_errors(readme, skill):
    mod = load_mod()
    root = Path(tempfile.mkdtemp())
    try:
        (root / SKILL_REL).parent.mkdir(parents=True)
        (root / SKILL_REL).write_text(skill, encoding="utf-8")
        (root / "README.md").write_text(readme, encoding="utf-8")
        mod.ROOT = root
        errors = []
        mod.check_claim_labels(errors)
        return errors
    finally:
        shutil.rmtree(root)


def edited(text, old, new):
    assert text.count(old) == 1, old
    return text.replace(old, new)


class ClaimLabelTest(unittest.TestCase):
    def test_readme_matches_skill_tiers(self):
        mod = load_mod()
        errors = []
        mod.check_claim_labels(errors)
        self.assertEqual(errors, [])

    def test_readme_verified_rule_drift_fails(self):
        readme = edited(
            README,
            "**verified** (one tier A source, or two independent tier B)",
            "**verified** (two tier A sources)",
        )
        errors = label_errors(readme, SKILL)
        self.assertTrue(any("README.md: verified label" in e for e in errors), errors)

    def test_readme_unverified_rule_drift_fails(self):
        readme = edited(README, "**unverified** (everything else", "**unverified** (anything a verifier doubts")
        errors = label_errors(readme, SKILL)
        self.assertTrue(any("README.md: unverified label" in e for e in errors), errors)

    def test_skill_verified_rule_drift_fails(self):
        skill = edited(
            SKILL,
            "verified (one tier A source, or two independent tier B)",
            "verified (two tier A sources)",
        )
        errors = label_errors(README, skill)
        self.assertTrue(any("SKILL.md: missing verification label rule 'verified" in e for e in errors), errors)

    def test_verified_rule_is_not_found_inside_unverified(self):
        readme = edited(
            README,
            "**verified** (one tier A source, or two independent tier B)",
            "**unverified** (one tier A source, or two independent tier B)",
        )
        errors = label_errors(readme, SKILL)
        self.assertTrue(any("README.md: verified label" in e for e in errors), errors)


if __name__ == "__main__":
    unittest.main()
