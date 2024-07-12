# token_check.py
from aiogram.utils.token import TokenValidationError, validate_token
from typing import Any, Dict, Union
import re
import sys
import json

tokens = ["123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"]
def check_token1( token):
    if token in tokens:
        return False
    else:
        return True
def is_bot_token(value: str) -> Union[bool, Dict[str, Any]]:
    try:
        validate_token(value)
    except TokenValidationError:
        return False
    return True
def check_token(token):
    pattern = re.compile(r"^\d+:[\w-]{35}$")
    if pattern.match(token):
        token_v =is_bot_token(token) 
        if token_v == True:
            tok_chek = check_token1(token)
            if tok_chek == True:
                return {"valid": True}
    else:
        return {"valid": False}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"valid": False, "error": "No token provided"}))
        sys.exit(1)
    token = sys.argv[1]
    result = check_token(token)
    print(json.dumps(result))
