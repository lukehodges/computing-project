# import hashlib
# alg = hashlib.md5()

# strmsg = input("enter string").encode('utf-8')
# slt = input("enter salt").encode('utf8')
# alg.update(strmsg+slt)
# print(alg.digest)


def validate(email:str):
    if email.count('@') != 1:return False
    if email.index('@') == 1:return False
    if email.index('@') == len(email) - 1: return False
    if email.count('.') == 0: return False
    if email.index('.') == 0: return False
    if email.index('.') == len(email) - 1: return False
    for email in email.split('@'):
        for email in email.split('.'):
            if not email.isalnum(): return False
    return True
email = input("enter your email")
print(validate(email))


import re
print(re.search(r'[\w.-]+@[\w.-]+', email))