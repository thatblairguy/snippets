# Unit Tests in Python

The module lives in the root directory.  Test fixtures reside in the `__tests__` directory.

Tests may be run in several ways:

- Find all tests in the `__tests__` directory:<br>
    `python3 -m unittest discover __tests__`
- Enumerate specific modules:<br>
    `python3 -m unittest __tests__.test_foo`
- Run all tests in a specific test fixture (class):<br>
    `python3 -m unittest __tests__.test_foo.TestFooFunction`
- Run a single specific test:<br>
    `python3 -m unittest __tests__.test_foo.TestFooFunction.test_foo_returns_bar`
