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
	if [[ "$OSTYPE" == "darwin"* ]]
	then
		SAG_HOME=/Applications/SoftwareAG/10.7
	else
		SAG_HOME=/opt/softwareag
	fi
fi

# Check if classic Integration Server or MSR

if [ -r $SAG_HOME/IntegrationServer/instances ]
then
	cd ${SAG_HOME}/IntegrationServer/instances/default/packages/JcTestRunner/resources
else
	cd ${SAG_HOME}/IntegrationServer/packages/JcTestRunner/resources
fi

chmod u+x ./ant/bin/runant.*
chmod u+x ./ant/bin/antRun*
chmod u+x ./ant/bin/complete*.*
chmod u+x ./ant/bin/ant

if [ "${server}x" != "x" ] 
then
	replace_text_properties localhost ${server};
fi

if [ "${port}x" != "x" ] 
then
	replace_text_properties 5555 ${port};
fi

if [ "${is_user}x" != "x" ] 
then
	replace_text_properties Administrator ${is_user};
fi

if [ "${is_password}x" != "x" ] 
then
	replace_text_properties Administrator ${is_password};
fi

touch ../pub/running.txt

ant -f run-test-suites.xml runall-test

rm ../pub/running.txt
touch ../pub/completed.txt



