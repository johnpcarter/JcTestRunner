/* Copyright (c) 2017-2018 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors. 
 * Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG. 
 */

(function () {

    var app = angular.module('app')

    app.directive('percentageelem', function () {
        var directiveP = {};

        directiveP.restrict = 'E'; /* restrict this directive to elements */

        directiveP.link = function ($scope, element, attributes) {

            $scope.$watch("row.entity", function (v) {
                //console.log(v.displayText);

                var insData = v;


                var percentageText = ((insData.visitedChildCount * 100) / insData.childCount).toFixed(1);
                if (percentageText == undefined || isNaN(percentageText)) {
                    percentageText = ""; // Error case
                }


                var totallength = insData._package_scope;
                //var totallength = insData._global_scope;
                if ($scope.$parent.$parent.$root.pagecontext == "executionmodel") {
                    totallength = insData._test_scope;
                }


                var barlength = (insData.childCount * 100) / totallength;
                var greenbarlength = ((insData.visitedChildCount * 100) / insData.childCount) * (barlength / 100);
                var notvisitedcount = insData.childCount - insData.visitedChildCount;
                var redbarlength = ((notvisitedcount * 100) / insData.childCount) * (barlength / 100);

                var greenimagesrc = "images/greenstrip.png";
                var redimagesrc = "images/redstrip.png";

                var greemimagehtml = '<image src="' + greenimagesrc + '" alt=a height="10" width="' + greenbarlength + '%" style = "padding : 0 10 0 0">';
                var redimagehtml = '<image src="' + redimagesrc + '" alt=a height="10" width="' + redbarlength + '%" style = "padding : 0 0 0 10">';

                element.html(
                    '<div style = "width : 85% ; float : left; padding-left : 5px" >' + redimagehtml + greemimagehtml + '</div>' +
                    '<div style = "width : 10% ; float : right" >' + percentageText + '</div>');
                ////element.css("width", "90%");

            });

        }

        return directiveP;
    });




    app.directive('displaytext', function () {
        var directive = {};

        directive.restrict = 'E';
        directive.link = function ($scope, element, attributes) {



            $scope.$watch("row", function (row) {
                //console.log(v.displayText);

                var insData = row.entity;
                var imageprovider = row.grid.appScope.images;
                var type;
                var serviceType;

                if (insData != "undefined") {
                    type = insData.Type;
                    serviceType = insData.serviceType;
                }

                var displayText = " " + insData.displayText;

                //var imagesrc;
                //var altText;

                /* if (type == "SEQUENCE") {
                    imagesrc = "images/Sequence.gif"; altText = "SEQUENCE";
                } else if (type == "BRANCH") {
                    imagesrc = "images/Branch.gif"; altText = "BRANCH";
                } else if (type == "LOOP") {
                    imagesrc = "images/Loop.gif"; altText = "LOOP";
                } else if (type == "RETRY") {
                    imagesrc = "images/Repeat.gif"; altText = "RETRY";
                } else if (type == "MAP") {
                    imagesrc = "images/Map.gif"; altText = "MAP";
                } else if (type == "EXIT") {
                    imagesrc = "images/Exit.gif"; altText = "EXIT";
                } else if (type == "INVOKE") {
                    imagesrc = "images/Invoke.gif"; altText = "INVOKE";
                } else if (type == "ROOT") {
                    imagesrc = "images/ns_flow.gif"; altText = "FLOWROOT";
                } else if (type == "service" && (serviceType == "flow/default")) {
                    imagesrc = "images/ns_flow.gif"; altText = "FLOWSERVICE";
                }

                else if (type == "PACKAGES") {
                    imagesrc = "images/ns_package.gif"; altText = "PACKAGE";
                }

                else if (type == "MAPCOPY") {
                    imagesrc = "images/map_connect_enabled.gif"; altText = "MAPCOPY";
                } else if (type == "MAPDELETE") {
                    imagesrc = "images/map_drop.gif"; altText = "MAPDELETE";
                } else if (type == "MAPSET") {
                    imagesrc = "images/map_default.gif"; altText = "MAPSET";
                } else if (type == "MAPINVOKE") {
                    imagesrc = "images/transformer_small.gif"; altText = "MAPINVOKE";
                } else if (type == "MAPFOREACH") {
                    imagesrc = "images/foreach_map_connect_enabled.png"; altText = "MAPFOREACH";
                }

                else if (type == "TestCase") {
                    imagesrc = "images/test.gif"; altText = "UNKNOWN";
                }
                else if (type == "Ghost") {
                    imagesrc = "images/test.gif"; altText = "UNKNOWN";
                }

                else if ((type == "java/unknown") || (type == "java/default")) {
                    imagesrc = "images/ns_java.gif"; altText = "JAVASERVICE";
                } else if (type == "service" && (serviceType == "java/default" || "java/unknown")) {
                    imagesrc = "images/ns_java.gif"; altText = "JAVASERVICE";
                }

                else if (type == "java/c") {
                    imagesrc = "images/ns_c.gif"; altText = "CSERVICE";
                } else if (type == "service" && (serviceType == "java/c")) {
                    imagesrc = "images/ns_c.gif"; altText = "CSERVICE";
                }

                else if (type == "AdapterService/unknown") {
                    imagesrc = "images/adapter_service.gif"; altText = "ADAPTERSERVICE";
                } else if (type == "service" && (serviceType == "AdapterService/unknown")) {
                    imagesrc = "images/adapter_service.gif"; altText = "ADAPTERSERVICE";
                }

                else if (serviceType == "java/error") {
                    imagesrc = "images/Service16.gif"; altText = "UNKNOWNSERVICE";
                } */


                if (type == "service" && (serviceType == "flow/default")) {
                    type = "service";
                }

                else if ((type == "java/unknown") || (type == "java/default")) {
                    type = "java_service";
                }
                else if (type == "service" && (serviceType == "java/default" || "java/unknown")) {
                    type = "java_service";
                }

                else if (type == "java/c" || (type == "service" && (serviceType == "java/c")) ) {
                    type = "java_c";
                } 

                else if (type == "AdapterService/unknown") {
                    type = "AdapterService_unknown";
                } else if (type == "service" && (serviceType == "AdapterService/unknown")) {
                    type = "AdapterService_unknown";
                }

                else if (serviceType == "java/error") {
                    type = "java_error";
                }



                var treenode = row.treeNode;
                var iscollapsed = treenode.state == "collapsed";
                var haschild = treenode.children && treenode.children.length > 0;
                var treel = row.treeLevel;



                var html_line1 = '<i ng-class="ui-grid-icon-right-dir" class="ui-grid-icon-right-dir"></i>';
                if (!iscollapsed) {
                    html_line1 = '<i ng-class="ui-grid-icon-down-dir" class="ui-grid-icon-down-dir"></i>';
                }
                if (!haschild) {
                    html_line1 = '<i ng-class="ui-grid-icon-blank" class="ui-grid-icon-blank"></i>';
                }


                var html_line2 = '<img src="' + imageprovider[type] + '" alt="' + type + '" height="16" width="16">' + displayText;
                ////var html_line2 = '<img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16">' + displayText;
                //element.html('<img src="' + imagesrc + '" alt="' + altText + '" height="20" width="20">' + displayText);
                //element.html(html_line1 + html_line2);
                element.html(html_line2);

                var indent = insData.$$treeLevel == 0 ? 5 : insData.$$treeLevel * 15 + 5;
                ////element.css("width", "90%");
                //element.css("cursor", "pointer");

                ////element.css("font-size", "14px");
                //element.css("cursor", haschild ? "pointer" : "default");
                //element.css("font-weight", haschild ? "bold !important" : "normal");

                //element.css("padding-left", "" + indent + "px");
                ////element.css("padding-top", "2px");

            });


        }


        return directive;
    });



    app.directive('coveragesummarypercent', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {

            var greenimagesrc = "images/greenstrip.png";
            var redimagesrc = "images/redstrip.png";

            var greenbarlength = $scope.overallsummary.overall_pkg_coveragepercent;
            var redbarlength = 100 - greenbarlength;
            var greemimagehtml = '<image src="' + greenimagesrc + '" alt=a height="10" width="' + greenbarlength + '%" style = "padding : 0 10 0 0">';
            var redimagehtml = '<image src="' + redimagesrc + '" alt=a height="10" width="' + redbarlength + '%" style = "padding : 0 0 0 10">';
            
            //element.html('<div style = "width : 100%" >' + redimagehtml + greemimagehtml + '</div>');
            //element.css("min-height", "10px");
            
            element.html('' +
                + '<div class=\"progress\">' +
                +   '<div class=\"progress-bar progress-bar-danger\" style=\"width: 40%\">' +
                +       '<span class=\"sr-only\">10% Complete (danger)</span>' +
                +   '</div>' +
                +   '<div class=\"progress-bar progress-bar-success\" style=\"width: 60%\">' +
                +       '<span class=\"sr-only\">35% Complete (success)</span>' +
                +     '</div>' +
                +   '</div>' +
                + '');
            
            
            
            
            ////element.css("cursor", "default");

        }

        return directive;
    });



    app.directive('packagesummarydisplaytext', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;
            var imagesrc = "images/ns_package.gif";
            var altText = "PACKAGE";
            var x = $scope.x;
            if (pagecontext == "fullpackageview") {
                var displaytext = " " + x[1];
                element.html('<img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16">' + displaytext);
            } 
            else if (pagecontext == "servicelevel") {
                var displaytext = " " + x.instruction.displayText;
                element.html('<img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16">' + displaytext);
            }
            ////element.css("cursor", "default");

        }

        return directive;
    });


    app.directive('packagesummarypercentage', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;

            var x = $scope.x;
            if (x == undefined) {
                return;
            }
            var percentageText; // = ( (x[3] * 100) / x[2]).toFixed(1);
            //var percentageText = ( (x.instruction.visitedChildCount * 100) / x.instruction.childCount).toFixed(1);

            if (pagecontext == "fullpackageview") {
                percentageText = ( (x[3] * 100) / x[2]).toFixed(1);
            }
            else if (pagecontext == "servicelevel") {
                percentageText = ( (x.instruction.visitedChildCount * 100) / x.instruction.childCount).toFixed(1);
            }

            var greenimagesrc = "images/greenstrip.png";
            var redimagesrc = "images/redstrip.png";

            var greenbarlength = percentageText ;
            var redbarlength = 100 - greenbarlength;

            var greemimagehtml = '<image src="' + greenimagesrc + '" alt=a height="10" width="' + greenbarlength + '%" style = "padding : 0 10 0 0">';
            var redimagehtml = '<image src="' + redimagesrc + '" alt=a height="10" width="' + redbarlength + '%" style = "padding : 0 0 0 10">';

            element.html(
                '<div style = "width : 40% ; float : left; padding-left : 5px" >' + redimagehtml + greemimagehtml + '</div>' +
                '<div style = "width : 40% ; float : right" >' + percentageText + ' % ' + '</div>');
            ////element.css("width", "100%");
            ////element.css("cursor", "default");
        }

        return directive;
    });



    app.directive('suitesummarydisplaytext', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;
            var imagesrc = "images/testsuite.gif";
            var altText = "TESTSUITE";
            var x = $scope.x;
            var displaytext = "  " + x.testSuiteId.split('->')[0];
            var tooltiptext = "Location: " + x.testSuiteId.split('->')[1];
            element.html('<div data-toggle="tooltip" title="' + tooltiptext + '"><img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16" style="margin-right:5px"/>' + displaytext + '</div>');
            ////element.css("cursor", "default");
        }

        return directive;
    });



    app.directive('testcountsummarydisplaytext', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;
            var imagesrc = "images/test.gif";
            var altText = "TESTS";
            var x = $scope.x;
            var displaytext = " " + x.testCases.length;
            var tooltiptext = '<div class="list-group">';
            var testcases = [];
            testcases = x.testCases;
            // testcases.forEach(element => {
            //     var displaytext1 = " " + element[0];
            //     tooltiptext += '<div class="list-group-item"><img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16"/>' + displaytext1 + '</div>';
            // });

            testcases.forEach(function(element) {
                var displaytext1 = " " + element[0];
                tooltiptext += '<div class="list-group-item"><img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16"/>' + displaytext1 + '</div>';
            });


            tooltiptext += '</div>' ;
            //tooltiptext = '<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>' ;
            //element.html('<div data-toggle="tooltip" data-html="true" title="<h1><strong>HTML</strong> inside <code>the</code> <em>tooltip</em></h1>">' + displaytext + '</div>');

            element.html(displaytext);
            element.tooltip({title: tooltiptext, html: true, placement: "left",});
            ////element.css("cursor", "default");
        }

        return directive;
    });



    app.directive('testsummarypercentage', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;

            var x = $scope.x;
            if (x == undefined) {
                return;
            }
            var percentageText = ( (x[4] * 100) / x[3]).toFixed(1);
            

            var greenimagesrc = "images/greenstrip.png";
            var redimagesrc = "images/redstrip.png";

            var greenbarlength = percentageText ;
            var redbarlength = 100 - greenbarlength;

            var greemimagehtml = '<image src="' + greenimagesrc + '" alt=a height="10" width="' + greenbarlength + '%" style = "padding : 0 10 0 0">';
            var redimagehtml = '<image src="' + redimagesrc + '" alt=a height="10" width="' + redbarlength + '%" style = "padding : 0 0 0 10">';

            element.html(
                '<div style = "width : 40% ; float : left; padding-left : 5px" >' + redimagehtml + greemimagehtml + '</div>' +
                '<div style = "width : 40% ; float : right" >' + percentageText + ' % ' + '</div>');
            ////element.css("width", "100%");
            ////element.css("cursor", "default");
        }

        return directive;
    });



    app.directive('testsummarydisplaytext', function () {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function ($scope, element, attributes) {
            var pagecontext = $scope.$parent.$parent.$parent.$root.pagecontext;
            var imagesrc = "images/test.gif";
            var altText = "TEST";
            var x = $scope.x;
            var displaytext = x[0];

            
            element.html('<img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16" style="margin-right:5px">' + displaytext + '</img>');
            //element.html(displaytext);
            element.css("cursor", "default");
            //element.css("word-wrap", "break-word");
            //element.css("max-width", "10px");
            //element.css("min-width", "10px");
            
            var suiteID = x[7];
            if (suiteID != undefined) {
                var suitetext = "  Suite: " + suiteID.split('->')[0];
                var suitelocation = "Location: " + suiteID.split('->')[1];
                var tooltiptext = '<div>' + suitetext + '</div><div>' + suitelocation + '</div>';
                element.tooltip({title: tooltiptext, html: true, placement: "left",});
            }
        }

        return directive;
    });


    //@deprecated
    app.directive('testservicesummarydisplaytext', function () {
        var directive = {};

        directive.restrict = 'E';
        directive.link = function ($scope, element, attributes) {
            var x = $scope.x;
            var displayText = " " + x[1];
            var type = x[5];
            var serviceType = x[6];

            if (type == "ROOT") {
                imagesrc = "images/ns_flow.gif"; altText = "FLOWROOT";
            } else if (type == "service" && (serviceType == "flow/default")) {
                imagesrc = "images/ns_flow.gif"; altText = "FLOWSERVICE";
            }

            else if ((type == "java/unknown") || (type == "java/default")) {
                imagesrc = "images/ns_java.gif"; altText = "JAVASERVICE";
            } else if (type == "service" && (serviceType == "java/default" || "java/unknown")) {
                imagesrc = "images/ns_java.gif"; altText = "JAVASERVICE";
            }

            else if (type == "java/c") {
                imagesrc = "images/ns_c.gif"; altText = "CSERVICE";
            } else if (type == "service" && (serviceType == "java/c")) {
                imagesrc = "images/ns_c.gif"; altText = "CSERVICE";
            }

            else if (type == "AdapterService/unknown") {
                imagesrc = "images/adapter_service.gif"; altText = "ADAPTERSERVICE";
            } else if (type == "service" && (serviceType == "AdapterService/unknown")) {
                imagesrc = "images/adapter_service.gif"; altText = "ADAPTERSERVICE";
            }

            else if (serviceType == "java/error") {
                imagesrc = "images/Service16.gif"; altText = "UNKNOWNSERVICE";
            }

            
            var html_line = '<img src="' + imagesrc + '" alt="' + altText + '" height="16" width="16">' + displayText;
            element.html(html_line);
            ////element.css("font-size", "14px");
            ////element.css("padding-top", "2px");
            ////element.css("cursor", "default");

        }


        return directive;
    });

}).call(this);