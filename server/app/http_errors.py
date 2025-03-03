from flask import Response


def bad_request_error(body=""):
    resp = Response()
    resp.headers.add("Content-Type", "text/html")
    resp.data = body
    resp.status_code = 400
    return resp


def unauthorized_erroor():
    resp = Response()
    resp.status_code = 401
    return resp
