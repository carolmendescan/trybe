import pytest
from challenges.challenge_encrypt_message import encrypt_message


def test_encrypt_message():
    # pass
    with pytest.raises(TypeError, match="tipo inválido para key"):
        encrypt_message("Oi eu me chamo Ana", 'a')
    with pytest.raises(TypeError, match="tipo inválido para message"):
        encrypt_message(4, 5)

    assert encrypt_message("Oi Ana", 5) == "nA iO_a"
    assert encrypt_message("Oi Ana", 4) == "an_A iO"
    assert encrypt_message("Oi Ana", 10) == "anA iO"
