/* Copyright (c) 2017-2018 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors. 
 * Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG. 
 */

(function () {
    
    var app = angular.module('app')


    app.service('splitfile$dataservice', function () {
        return function (scope, parent) {
            var data_location = parent.data_location;
            var paginationoptions = parent.paginationoptions;
            var itemsPerPage = paginationoptions.itemsPerPage;
            var startIdx = (paginationoptions.currentPage - 1) * itemsPerPage;
            var endIdx = startIdx + itemsPerPage;
            var totalItems = paginationoptions.totalItems;
            endIdx = endIdx < totalItems ? endIdx : totalItems;

            console.log('Page changed to: ' + paginationoptions.currentPage + ' -- view : ' + scope.param);
            console.log('Grid Data changed. itemsPerPage: ' + itemsPerPage + ' >> startIdx: ' + startIdx + ' >> endIdx: ' + endIdx);
            
            if (scope.param == "fullpackageview") {
                var elementNSCascadedResultStatsSub = [];
                var elementNSCascadedResult = parent.elementNSCascadedResult;

                for (var index = startIdx; index < endIdx; index++) {
                    var element = elementNSCascadedResult.pckmap[index];
                    $.ajax({
                        url: data_location + "/eic_ns_" + element[1] + ".json",
                        async: false,
                        success: function (result) {
                            elementNSCascadedResultStatsSub.push(result);
                            console.log(result);
                        }
                    });
                }
            
                elementNSCascadedResult.Stats.instruction.SubInstruction = elementNSCascadedResultStatsSub;
            } else if (scope.param == "executionmodel") {
                // TODO
            }
            return scope;

        }


    });

    app.service('pb$dataservice', function () {
        return function (result) {
            var myfunc = function (instruction) {
                instruction._package_scope = current_package_scope;
                instruction._global_scope = global_scope;
                if (instruction.SubInstruction != undefined) {
                    var elements = instruction.SubInstruction;
                    // elements.forEach(element => {
                    //     myfunc(element.instruction);
                    // });
                    elements.forEach(function(element) {
                        myfunc(element.instruction);
                      });

                }
                return instruction;
            }

            var lo_stats = result.Stats.instruction;
            var global_scope = lo_stats.childCount;
            var packages = result.Stats.instruction.SubInstruction;
            var current_package_scope;

            if (packages != undefined) {
                // packages.forEach(package => {
                //     current_package_scope = package.instruction.childCount;
                //     myfunc(package.instruction);
                // });
                packages.forEach(function(package) {
                    current_package_scope = package.instruction.childCount;
                    myfunc(package.instruction);
                  });
            }

            return result;

        }


    });


    app.service('em$dataservice', function () {
        return function (result) {
            var myfunc = function (instruction) {
                instruction._test_scope = current_test_scope;
                if (instruction.SubInstruction != undefined) {
                    var elements = instruction.SubInstruction;
                    // elements.forEach(element => {
                    //     myfunc(element.instruction);
                    // });
                    elements.forEach(function(element) {
                        myfunc(element.instruction);
                    });
                }
                return instruction;
            }

            var lo_stats = result;
            var current_test_scope;


            // var i = 0;
            // lo_stats.forEach(lo_stat => {
            //     current_test_scope = lo_stat.instruction.childCount;
            //     myfunc(lo_stat.instruction);
            // });

            lo_stats.forEach(function(lo_stat) {
                current_test_scope = lo_stat.instruction.childCount;
                myfunc(lo_stat.instruction);
            });

            return result;
        }

    });



    app.service('td$dataservice', function () {
        return function (testdescs) {
            var lo_testdescs = testdescs.data;
            var tests = [];
            var suites = [];
            var totalchildcount = 0;
            var totalvisitedchildcount = 0;

            // lo_testdescs.forEach(element_suite => {
            //     suites.push(element_suite.testSuiteId);
            //     element_suite.testCases.forEach(element_test => {
            //         element_test.push(element_suite.testSuiteId);
                    
            //         try {
            //             if (element_test.length > 3 && !isNaN(element_test[3])) {
            //                 totalchildcount += parseInt(element_test[3]);
            //             }

            //             if (element_test.length > 4 && !isNaN(element_test[4])) {
            //                 totalvisitedchildcount += parseInt(element_test[4]);
            //             }

            //         } catch (error) {
            //             console.log(error);
            //         }
                    
            //         tests.push(element_test)
            //     });
            // });

            lo_testdescs.forEach(function(element_suite) {
                suites.push(element_suite.testSuiteId);

                element_suite.testCases.forEach(function(element_test) {
                    element_test.push(element_suite.testSuiteId);
                    
                    try {
                        if (element_test.length > 3 && !isNaN(element_test[3])) {
                            totalchildcount += parseInt(element_test[3]);
                        }

                        if (element_test.length > 4 && !isNaN(element_test[4])) {
                            totalvisitedchildcount += parseInt(element_test[4]);
                        }

                    } catch (error) {
                        console.log(error);
                    }
                    
                    tests.push(element_test)
                });
            });

            testdescs.fulltests = tests;
            testdescs.totalchildcount = totalchildcount;
            testdescs.totalvisitedchildcount = totalvisitedchildcount;
            return testdescs;
        }

    });



    app.service('CommaFormatted', function () {
        return function (nStr) {
            nStr += "";
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ', ' + '$2');
            }
            return x1 + x2;
        }

    });


    app.service('imageproviderservice', function () {
        return function (scope) {

            scope.images = {
                SEQUENCE: "images/Sequence.gif",
                TRY: "images/FlowTry.png",
                CATCH: "images/FlowCatch.png",
                FINALLY: "images/FlowFinally.png",
                BRANCH: "images/Branch.gif",
                LOOP: "images/Loop.gif",
                RETRY: "images/Repeat.gif",
                MAP: "images/Map.gif",
                EXIT: "images/Exit.gif",
                INVOKE: "images/Invoke.gif",
                ROOT: "images/ns_flow.gif",
                service: "images/ns_flow.gif",

                PACKAGES: "images/ns_package.gif",

                MAPCOPY: "images/map_connect_enabled.gif",
                MAPDELETE: "images/map_drop.gif",
                MAPSET: "images/map_default.gif",
                MAPINVOKE: "images/transformer_small.gif",
                MAPFOREACH: "images/foreach_map_connect_enabled.png",

                TestCase: "images/test.gif",
                Ghost: "images/test.gif",

                java_service: "images/ns_java.gif",

                AdapterService_unknown: "images/adapter_service.gif",
                java_c: "images/ns_c.gif",
                java_error: "images/Service16.gif"
            };

        }


    });


})();//.call(this);