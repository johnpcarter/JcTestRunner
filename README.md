##JcTestRunner

Automatically scans all of your packages looking for wm test suites, run thems and copies the results to the JcTestRunners pub folder so that you can view the tests online i.e.

http://<host>:<port>/JcTestRunner

or ping it with

http://<host>:<port>/rad/jc.test.runner:api/ping
response : NONE, TODO, COMPLETED, FAILED

to block until done
http://<host>:<port>/rad/jc.test.runner:api/status/{waitInterval}/{maxWaitCount}
response: NONE, COMPLETED, FAILED

you can even pull the test results if you don’t want to use the web page.
http://<host>:<port>/rad/jc.test.runner:api/instances/pull 

