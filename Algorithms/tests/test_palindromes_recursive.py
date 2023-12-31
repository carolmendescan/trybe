import sys

import pytest
from challenges.challenge_palindromes_recursive import is_palindrome_recursive


@pytest.fixture
def is_recursive():
    sys.setrecursionlimit(100)
    with pytest.raises(RecursionError):
        word = "A" * 200
        is_palindrome_recursive(word, 0, len(word) - 1)


def test_recursive_palindrome_success(is_recursive):
    word = "I"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True
    word = "GG"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True
    word = "ANA"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True
    word = "ESSE"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True
    word = "SOCOS"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True
    word = "REVIVER"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is True


def test_not_recursive_palindrome(is_recursive):
    word = "AGUA"
    assert is_palindrome_recursive(word, 0, len(word) - 1) is False


def test_not_recursive_palindrome_when_empty_input(is_recursive):
    word = ""
    assert is_palindrome_recursive(word, 0, len(word) - 1) is False
