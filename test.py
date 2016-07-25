def exec_eval(code):
    exec(code)

request = "Simple string"

str = """
import os

print(request)

for dirname, dirnames, filenames in os.walk('.'):
    # print path to all subdirectories first.
    for subdirname in dirnames:
        print(os.path.join(dirname, subdirname))
"""

exec_eval(str)
