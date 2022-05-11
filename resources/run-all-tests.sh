#!/bin/sh

replace_text_properties () {
	sed "s/$1/$2/g" run-test-suites.properties > run-test-suites.properties.bk
	rm run-test-suites.properties
	mv run-test-suites.properties.bk run-test-suites.properties
}

ANT_HOME=./ant;export ANT_HOME
PATH=./ant/bin:/$PATH;export PATH

# check if SAG home directory is set
# otherwise guess!

if [ "${SAG_HOME}x" == "x" ]
then
	SAG_HOME=/opt/softwareag
fi

# Check if classic Integration Server or MSR
		
if [ -r $SAG_HOME/IntegrationServer/instances ]
then
	cd ${SAG_HOME}/IntegrationServer/instances/default/packages/JcTestRunner/resources
	cp run-test-suites.properties.is run-test-suites.properties
elif [ -r ${SAG_HOME}/IntegrationServer/packages ]
then
	cd ${SAG_HOME}/IntegrationServer/packages/JcTestRunner/resources
	cp run-test-suites.properties.msr run-test-suites.properties
elif [[ $OSTYPE == darwin* ]]
then
	SAG_HOME=/Applications/SoftwareAG/10.11
	
	cd ${SAG_HOME}/IntegrationServer/instances/default/packages/JcTestRunner/resources
	cp run-test-suites.properties.mac run-test-suites.properties
else
	SAG_HOME=/opt/softwareag
fi
		
chmod u+x ./ant/bin/runant.*
chmod u+x ./ant/bin/antRun*
chmod u+x ./ant/bin/complete*.*
chmod u+x ./ant/bin/ant

if [ "${is_test_server}x" != "x" ] 
then
	replace_text_properties localhost ${is_test_server};
fi

if [ "${is_test_port}x" != "x" ] 
then
	replace_text_properties 5555 ${is_test_port};
fi

if [ "${is_test_user}x" != "x" ] 
then
	replace_text_properties Administrator ${is_test_user};
fi

if [ "${is_test_password}x" != "x" ] 
then
	replace_text_properties manage ${is_test_password};
fi

if [ "${1}x" != "x" ]
then
	is_test_package=$1
fi

if [ "${is_test_package}x" == "x" ]
then
	is_test_package="*"
fi

touch ../pub/running.txt

ant -f run-test-suites.xml -Dpackage=${is_test_package} runall-test

rm ../pub/running.txt
touch ../pub/completed.txt



