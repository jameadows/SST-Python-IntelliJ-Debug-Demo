import pydevd_pycharm
pydevd_pycharm.settrace('localhost', port=5678, stdoutToServer=True, stderrToServer=True)
import json


def debug_target(event,context):
    # pydevd_pycharm.settrace('localhost', port=5678, stdoutToServer=True, stderrToServer=True)
    return {
        'statusCode': 200,
        "body": json.dumps({"message": "Hello world!"}),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
