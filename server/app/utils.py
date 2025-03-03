import bcrypt


def generate_hashpwd(user_secret):
    hash = bcrypt.hashpw(user_secret.encode("utf-8"), bcrypt.gensalt())
    return hash.decode("utf-8")


def check_hashpwd(user_secret, hash_pwd):
    return bcrypt.checkpw(user_secret.encode("utf-8"), hash_pwd.encode("utf-8"))
