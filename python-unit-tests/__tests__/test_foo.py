# test_foo.py

import unittest
from my_module import foo

class TestFooFunction(unittest.TestCase):
    def test_foo_returns_bar(self):
        result = foo()
        self.assertEqual(result, "bar")

if __name__ == '__main__':
    unittest.main()
