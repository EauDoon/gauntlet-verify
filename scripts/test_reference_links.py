"""Undefined reference-style links must fail the structural check."""

import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def load_mod():
    spec = importlib.util.spec_from_file_location(
        "check_skill_refs", REPO / "scripts" / "check_skill.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def text_errors(markdown):
    mod = load_mod()
    root = Path(tempfile.mkdtemp())
    try:
        (root / "README.md").write_text(markdown, encoding="utf-8")
        old = mod.ROOT
        mod.ROOT = root
        errors = []
        try:
            mod.check_text(errors)
        finally:
            mod.ROOT = old
        return errors
    finally:
        shutil.rmtree(root)


class ReferenceLinkTest(unittest.TestCase):
    def test_undefined_full_reference_fails(self):
        errors = text_errors("See [the changelog][missing].\n")
        self.assertTrue(
            any("undefined reference link 'missing'" in e for e in errors),
            errors,
        )

    def test_defined_reference_passes(self):
        errors = text_errors("See [the changelog][there].\n\n[there]: README.md\n")
        self.assertFalse(any("undefined reference" in e for e in errors), errors)
        self.assertFalse(any("broken relative link" in e for e in errors), errors)

    def test_collapsed_reference_fails(self):
        errors = text_errors("See [missing][].\n")
        self.assertTrue(any("undefined reference link 'missing'" in e for e in errors), errors)

    def test_undefined_image_reference_fails(self):
        errors = text_errors("![banner][missing]\n")
        self.assertTrue(any("undefined reference link 'missing'" in e for e in errors), errors)

    def test_label_match_is_case_insensitive(self):
        errors = text_errors("See [x][There].\n\n[there]: README.md\n")
        self.assertFalse(any("undefined reference" in e for e in errors), errors)

    def test_fenced_reference_is_ignored(self):
        errors = text_errors("```\n[x][missing]\n```\n")
        self.assertFalse(any("undefined reference" in e for e in errors), errors)


if __name__ == "__main__":
    unittest.main()
