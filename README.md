## JcTestRunner

Automatically scans all of your packages looking for wm test suites, run them and copies the results to the JcTestRunners pub folder so that you can view the tests online i.e.

```
http://<host>:<port>/JcTestRunner
```

or ping it with
```
http://<host>:<port>/rad/jc.test.runner:api/ping
```

response : NONE, TODO, COMPLETED, FAILED

to block until done
```
http://<host>:<port>/rad/jc.test.runner:api/status/{waitInterval}/{maxWaitCount}
```

response: NONE, COMPLETED, FAILED

you can even pull the test results if you don’t want to use the web page.
```
http://<host>:<port>/rad/jc.test.runner:api/instances/pull 
```

if you don't want to run all test cases then you can specify which package to test when starting the container via the following environment variable.

```
-e is_test_package=JcHelloWorld
```

### Running tests manually

If you don't want to run packages automatically then set the global variable

```
jc.test.runner.manual=true
```

in which case you will need to run tests manually via the service

```
jc.test.runner.services:run
```

which will run all tests by default unless you provide the name of the package you wish to test
via the package input.

or via the API (all packages)

```
http://<host>:<port>/rad/jc.test.runner:api/run
```

or specifically for a package such as JcHelloWorld
```
http://<host>:<port>/rad/jc.test.runner:api/run/JcHelloWorld
```

## PRE-REQUISITES

This package only runs on either Linux or macOS installations and is not compatible Windows.

You will also need to set your IS server credentials if not defaults for tests to execute
```
export is_test_user=<user>
export is_test_password=<password>
```

or if starting as a container
```
-e is_test_user=<user> -e is_test_password=<password>
```


Set the following properties if you want to run the test on a remote server.
```
export is_test_server=<host>
export is_test_port=<port>
```