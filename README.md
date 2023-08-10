# SST-Python-IntelliJ-Debug-Demo
A barebones example of using IntelliJ to debug a Python Lambda function deployed by SST

## Motivation
I'd been looking for an excuse to try out SST, and when the need to debug a Lambda function written in Python came along
it gave me that excuse.  The learning curve of SST was very gentle, up until I tried to use IntelliJ to do source level
debugging.

As is often the case the solution came down to a few simple things that took me hours to figure out through a combination
of web searches, browsing the SST Discord and stepping through the SST code in the debugger.  As is also often the case
this solution has room for improvement.  There may be better approaches that what I landed on, and also it seems that 
SST is working to improve debugging support for Python.

I'm putting the example out there in case it saves someone else a few hours, and also for, when I inevitably forget the
how to make it work, to remind myself :)

## Usage
I have about two days of experience with SST, so I will not attempt to reinvent the wheel and explain the basics that
are already well documented elsewhere.  I'll assume you are able to deploy an SST stack, and will focus on the steps 
necessary to debug your Python Lambda in IntelliJ.

### Requirements
The key elements are:
* There must be a file named `requirements.txt`, `Pipfile` or `poetry.lock` in the directory where your code lives, \
or somewhere in the path above it.  These files may be empty, but if not found the execution will fail with an error\
stating that the source file could not be found.

* You will need to have the correct version of pydevd-pycharm installed (more on that below).  The python code will be\
executed in the host environment, not in a venv.  I did come across a mention on Discord that there is work in progress
to run Python functions in a venv but as of this version (v2.23.15) that is not the case.
* The SST stack is deployed independently, it doesn't need to be run under a debugger unless it's necessary for some other reason.\
Debugging of the Python function is done as a remote application.

### Setup
* In package.json under `scripts` change `sst dev` to `sst dev --increase-timeout`
* In IntelliJ set up a debug configuration for `Python Debug Server`.  Set the host and port values, in this example the remote host is `localhost`\
and the port is 8645.
* Follow the instructions in the configuration dialog about setting installing pydevd-pycharm.  In my case it says to do\
`pip install pydevd-pycharm~=231.9011.34`.  Use whatever version it shows for your installation.
* As also described in the configuration dialog, paste the following two lines at the top of your lambda function source file.\
This will trigger the debugger once your code is hit.
```
import pydevd_pycharm
pydevd_pycharm.settrace('localhost', port=8645, stdoutToServer=True, stderrToServer=True)
```
* Launch the python debugger, it will begin listening for the function to connect.  Once the connection is made\
you can step through your code and set breakpoints as desired.
* Each time your function executes will be a new instance so it will hit the trace breakpoint.

## Notes
* Initially IntelliJ kept telling me that it couldn't find the source code that mapped to the remote source file.  After\
trying many permutations with the file mapping I ended up uninstalling and reinstalling pydev-pycharmd and the problem went away.

## Conclusion
I know the above is terse, but it really only came down to a few key things, and hopefully the code will give you a working\
examples to use as a starting point.  I think this is an aspect of SST that will be evolving so this project may become
unnecessary or fall out of date. Please feel free to file a PR for any updates, improvements or corrections.

## Gratitude
Thanks to all who've done such a fine job of building and documenting SST.  I'm glad I finally took the time to get\
familiar and I'm sure the handful of hours I've spent so far will be more than rewarded by the days of tedium it will replace!

