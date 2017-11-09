/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This is an end-to-end test that focuses on exercising all parts of the fabric APIs
// in a happy-path scenario
'use strict';

var tape = require('tape');
var _test = require('tape-promise');
var test = _test(tape);
var e2eUtils = require('../e2e/e2eUtils.js');
var testUtils = require('../../unit/util');
var chaincodeId = testUtils.NODE_END2END.chaincodeId;

test('\n\n***** Node-Chaincode End-to-end flow: invoke transaction to move money *****\n\n', (t) => {
	e2eUtils.invokeChaincode('org2', 'v0', chaincodeId, t, false/*useStore*/)
		.then((result) => {
			if(result){
				t.pass('Successfully invoke transaction chaincode on channel');
				return sleep(5000);
			}
			else {
				t.fail('Failed to invoke transaction chaincode ');
				t.end();
			}
		}, (err) => {
			t.fail('Failed to invoke transaction chaincode on channel. ' + err.stack ? err.stack : err);
			t.end();
		}).then(() => {
			t.end();
		}).catch((err) => {
			t.fail('Test failed due to unexpected reasons. ' + err.stack ? err.stack : err);
			t.end();
		});
});

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}