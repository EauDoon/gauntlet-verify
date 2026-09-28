"""README verification labels must use the skill's tier rule."""

import importlib.util
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_labels", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class ClaimLabelTest(unittest.TestCase):
    def test_readme_matches_skill_tiers(self):
        mod = load_mod()
        errors = []
        mod.check_claim_labels(errors)
        self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
