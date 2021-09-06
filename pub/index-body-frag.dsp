	<link rel="stylesheet" type="text/css" href="/WmRoot/webMethods.css">
    <link rel="stylesheet" type="text/css" href="/WmRoot/top.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

%ifvar run -notempty%
		%invoke jc.test.runner.services:run%
		%endinvoke%
		<script language="JavaScript">
			window.alert("Running test cases, refresh page to see test results")
			
			if (inIframe())
				window.self.location.href="./index-body-frag.dsp"
			else
				window.self.location.href="."
		</script>
%endif%

<script language="JavaScript">

function refresh(args) {
	
	if (inIframe())
		window.self.location.href = "./index-body-frag.dsp?" + args;
	else
		window.self.location.href = ".?" + args;

	return false;
}

function showHistory(args) {
	
	if (inIframe())
		window.self.location.href = "./view-testsuite-history-frag.dsp?" + args;
	else
		window.self.location.href = "./view-testsuite-history.dsp?" + args;

	return false;
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

</script>
<div align="center" style="width:100%; margin-left: auto; margin-right: auto ;">
	%invoke jc.test.runner.services:cases%
	%loop results%
		<h2>%value containerName%</h2>
		%loop instances%
		%loop testSuites%
		<TABLE class="tableForm" width="90%">
			<TBODY>
  				<TR>
					<TD CLASS="heading" colspan="8">
						<div style="float: left; line-height: 25px; text-align: middle; padding: 5px">%value name%
						<a href="./results/html"><i class="fas fa-poll-h" style="font-size: 1.5em; color: Tomato;"></i>
						</div>
						<div style="float: right; line-height: 25px; text-align: middle; padding: 5px; color: white;">Download
						<a href="/rad/jc.test.runner:api/instances/pull"><i class="fas fa-file-download" style="font-size: 1.5em; color: white;"></i>
						</div>
					</TD>
				</TR>

				<TR class="subheading2">
					<TD width="20px"></TD>
					<TD width="200px">Name</td>
					<TD>Description</td>
					<TD width="60px">Duration</td>	
					<TD width="30px">Status</td>
				</TR>
		%loop cases%
			%ifvar name -notempty%
				<TR>
					<TD style="text-align: center">
						%ifvar error -notempty%
							<img src="resources/disabled.png">
						%else%
							<img src="resources/enabled.png">
						%endif%
					</TD>

					<TD>
						%value name%
					</TD>
					<TD>
						%ifvar error -notempty%
							%value error%
						%else%
							Passed
						%endif%
					</TD> 
					<TD>
						%value duration% ms
					</TD>
					<TD width="15px" style="text-align: center">
							%ifvar error -notempty%
								<i style="font-size: 1.5em; color: red" class="fas fa-bug"></i>
							%else%
								<i style="font-size: 1.5em; color: green" class="fas fa-thumbs-up"></i>
							%endif%
					</TD>
				</TR>
			%endif%
		%endscope%
			</TBODY>
		</TABLE>
		%endscope%
		%endscope%
		%endscope%
	%endinvoke%	
</div>

%ifvar suiteId -notempty%
<br>
	<div align="center" style="width:100%; margin-left: auto; margin-right: auto ;">
		<div style="display:flex; margin-left:45px; padding:20px">
			<span %ifvar mocker -notempty%class="subheading button"%else%class="subheading button button-selected"%endifvar%><a href="" onClick="return refresh('suiteId=%value suiteId%')" style="color:white">Test Cases</a></span>
			<span %ifvar mocker -notempty%class="subheading button button-selected"%else%class="subheading button"%endifvar% style="margin-left: 40px"><a style="color:white" href="" onClick="return refresh('mocker=true&suiteId=%value suiteId%')">Mocked Services</a></span>
		</div>
		%ifvar mocker -notempty%
			%invoke jc.mock.services:getMockedServicesForSuite% 
				<TABLE class="tableForm" width="90%">
	    			<TBODY>
	      				<TR>
							<TD CLASS="heading" colspan="7">Mocked Services for %value suiteId%</TD>
	    				</TR>
	    				<TR class="subheading2">
	    					<TD width="20px"></TD>
							<TD width="200px"></TD>
	    					<TD align="left" width="200px" colspan="2">Mock Criteria</TD>
							<TD width="200px" colspan="2">Mock Output</TD>
	    				</TR>
						<TR class="subheading2">
							<TD width="20px"></TD>
							<TD width="200px">Service</TD>
							<TD width="40px">Type</TD>
							<TD width="160px">Source</TD>
							<TD width="40px">Type</TD>
							<TD width="160px">Source</TD>
						</TR>
						%loop mocks%
							<TR>
								<TD style="text-align: center">
									%ifvar active equals('true')%
										<img src="resources/enabled.png">
									%else%
										<img src="resources/disabled.png">
									%endif%
								</TD>
								<TD>
									%value service%
								</TD>
								<TD>
									%value origin%
								</TD>
								<TD>
									%ifvar match equals('file')%
										%value matchLocation%
									%else%
										%value matchService%
									%endif%
								</TD>
								<TD>
									%value match%
								</TD>
								<TD>
									%ifvar origin equals('file')%
										%value location%
									%else%
										%value mockService%
									%endif%
								</TD>
							</TR>
						%endloop%
					</TBODY>
				</TABLE>
			%endinvoke%
		%else%
			%invoke jc.testsuite.services.query:getTestsForTestSuite% 
				<TABLE class="tableForm" width="90%">
	    			<TBODY>
	      				<TR>
							<TD CLASS="heading" colspan="7">Test Cases for %value suiteId%</TD>
	    				</TR>

						<TR class="subheading2">
							<TD width="20px"></TD>
							<TD width="200px" class="oddcol-l">Endpoint</td>
							<TD width="200px" class="oddcol-l">Description</td>
							<TD width="40px">Type</td>
							<TD class="oddcol">Details</td>
							<TD colspan="2" width="30px">Status</td>
						</TR>
				%loop tests%
					%ifvar endpoint -notempty%
						<TR>
							<TD style="text-align: center">
								%ifvar active equals('true')%
									<img src="resources/enabled.png">
								%else%
									<img src="resources/disabled.png">
								%endif%
							</TD>
							<TD>
								%value endpoint%
							</TD>
							<TD>
								%value description%
							</TD> 
							<TD>
								%value lastTestResult/failType%
							</TD>
							<TD>
								%value lastTestResult/failMessage%
							</TD>
							<TD width="15px" style="text-align: center">
								%ifvar lastTestResult/success -notempty%
									%ifvar lastTestResult/success equals(true)%
										<i style="font-size: 1.5em; color: green" class="fas fa-thumbs-up"></i>
									%else%
										<i style="font-size: 1.5em; color: red" class="fas fa-bug"></i>
									%endif%
								%else%
									<i style="font-size: 1.5em; color: gray" class="fas fa-question"></i>
								%endif%
							</TD>
							<TD width="15px" style="text-align: center">
								%ifvar lastTestResult/success equals(false)%
									%ifvar /caseId -isnotempty%
										<a href="" onClick="return refresh('suiteId=%value /suiteId%')"><i style="font-size: 1.5em; color: gray" class="fas fa-info"></i>
									%else%
										<a href="" onClick="return refresh('suiteId=%value /suiteId%&caseId=%value id%')"><i style="font-size: 1.5em; color: blue" class="fas fa-info"></i>
									%endifvar%
								%endifvar%
							</TD>
						</TR>
						%ifvar /caseId vequals(id)%
							%scope param(type='request')%
								%rename -copy id caseId%
								%rename -copy /suiteId suiteId%
								%invoke jc.testsuite.services.query:getTestCaseForTestSuite%
									%scope lastTestResult%
										%include view-testcase-details-frag.dsp%
									%endscope%
								%endinvoke%
							%endscope%
						%endifvar%
					%endif%
				%endscope%
					</TBODY>
				</TABLE>
			%endinvoke%
		%endifvar%
	</div>
%endifvar%