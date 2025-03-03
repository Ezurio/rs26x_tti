//*****************************************************************************
// LicenseID: LicenseRef-Ezurio-Clause
// ExtractedText: <text>
// Copyright (c) 2025 Ezurio LLC.
//
// All rights reserved.
//
// Section 1. Definitions
//
// “Authorized Product” means an Ezurio LLC or Laird Connectivity LLC hardware
// or software product.
//
// Section 2. Software License Agreement
//
// Permission to use, copy, modify, and/or distribute the Software in source or
// binary form is granted, provided the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
// this permission notice, and the disclaimer below.
//
// 2. Neither the name of Ezurio LLC nor the names of its contributors may be
// used to endorse or promote products derived from this software without
// specific prior written permission.
//
// 3. The Software, with or without modification, may only be used with an
// Authorized Product.
// 
// 4. If and to the extent that the Software is designed to be compliant with
// any published or de facto standard, regulatory standard, or industry
// specification, the Software may not be modified such that the Software or
// Authorized Product would be incompatible with such standard or specification.
// 
// 5. Any Software provided in binary form under this license may not be reverse
// engineered, decompiled, modified or disassembled.
//
// Section 3. Disclaimer
//
// THIS SOFTWARE IS PROVIDED BY EZURIO LLC "AS IS" AND ANY EXPRESS
// OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
// OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. TO THE MAXIMUM EXTENT ALLOWED BY LAW, IN NO EVENT SHALL
// EZURIO LLC OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// </text>
//*****************************************************************************

const DOWNLINK_MSG_TYPE_GET_SENSOR_CONFIG = 0;
const DOWNLINK_MSG_TYPE_SET_SENSOR_CONFIG = 1;

const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 = 1;
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 = 2;
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT32 = 4;

const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_ENUM = DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS = DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT32;

var enumEncodeAuRegion = {
  "AU915" : 0,
  "AU923" : 1
};

var enumEncodeRtcUpdateMode = {
  "Automatic" : 0,
  "Manual" : 1
};

var enumEncodeAggregationMode = {
  "None" : 0,
  "Aggregation" : 1,
  "Averaging" : 2
};

var enumEncodeBool = {
  "False" : 0,
  "True" : 1
};

var parameterTableEncodeNS1 = {
  "Friendly Name" :              {"tag" : 0,  "access" : "rw", "encoder" : encodeCharString, "min" : 0, "max" : 20 },
  "Sensor Type" :                {"tag" : 1,  "access" : "r" },
  "Sensor Update Rate" :         {"tag" : 2,  "access" : "rw", "encoder" : encodeUInt16, "min" : 5, "max" : 3600 },
  "BLE Address" :                {"tag" : 3,  "access" : "r" },
  "AU Region" :                  {"tag" : 5,  "access" : "rw", "encoder" : encodeEnum, "enumName" : enumEncodeAuRegion },
  "Confirmed Packets" :          {"tag" : 6,  "access" : "rw", "encoder" : encodeEnum, "enumName" : enumEncodeBool },
  "Confirmed Retry Count" :      {"tag" : 7,  "access" : "rw", "encoder" : encodeUInt8, "min" : 0, "max" : 10 },
  "Current TX Power" :           {"tag" : 8,  "access" : "r" },
  "LoRaWAN Connection Status" :  {"tag" : 11, "access" : "r" },
  "LoRaWAN RX Packet Count" :    {"tag" : 12, "access" : "r" },
  "LoRaWAN SNR" :                {"tag" : 13, "access" : "r" },
  "LoRaWAN State" :              {"tag" : 14, "access" : "r" },
  "LoRaWAN TX Packet Count" :    {"tag" : 15, "access" : "r" },
  "Max TX Power" :               {"tag" : 16, "access" : "rw", "encoder" : encodeUInt8, "min" : 0, "max" : 22 },
  "Region" :                     {"tag" : 17, "access" : "r" },
  "Sub-band" :                   {"tag" : 18, "access" : "rw", "encoder" : encodeUInt8, "min" : 1, "max" : 8 },
  "Aggregation Count" :          {"tag" : 19, "access" : "rw", "encoder" : encodeUInt8, "min" : 0, "max" : 10 },
  "Aggregation Mode" :           {"tag" : 20, "access" : "rw", "encoder" : encodeEnum, "enumName" : enumEncodeAggregationMode },
  "Clear Backlog" :              {"tag" : 22, "access" : "w",  "encoder" : encodeAction },
  "Device Type" :                {"tag" : 23, "access" : "r" },
  "Factory Reset" :              {"tag" : 25, "access" : "w",  "encoder" : encodeAction },
  "Host FW Version" :            {"tag" : 26, "access" : "r" },
  "Host Script Version" :        {"tag" : 27, "access" : "r" },
  "RM126x FW Version" :          {"tag" : 30, "access" : "r" },
  "RTC Time" :                   {"tag" : 31, "access" : "rw", "encoder" : encodeUTCSeconds, "min" : 0, "max" : 0xFFFFFFFF },
  "Software Device Reset" :      {"tag" : 32, "access" : "w",  "encoder" : encodeAction },
  "Thermistor 560 Cal Actual" :  {"tag" : 33, "access" : "r" },
  "Thermistor 330k Cal Actual" : {"tag" : 34, "access" : "r" },
  "Heartbeat LED Flash Period" : {"tag" : 35, "access" : "rw", "encoder" : encodeUInt8, "min" : 0, "max" : 60 },
  "BLE RSSI" :                   {"tag" : 36, "access" : "r" },
  "BLE TX Power" :               {"tag" : 37, "access" : "r" },
  "Device Model" :               {"tag" : 38, "access" : "r" },
  "LoRaWAN Packet Protocol" :    {"tag" : 39, "access" : "r" },
  "RTC Update Mode" :            {"tag" : 40, "access" : "rw", "encoder" : encodeEnum, "enumName" : enumEncodeRtcUpdateMode },
  "LoRaWAN RSSI" :               {"tag" : 41, "access" : "r" },
  "LoRaWAN Data Rate" :          {"tag" : 42, "access" : "r" }
};


function Encode(fPort, obj, variables) {

  var input = {};
  var output = {};
  
  input.Object.assign({"fPort" : fPort}, input);
  input.Object.assign({"data" : obj}, input);
  input.Object.assign({"variables" : variables}, input);
	
  output = encodeDownlink(input);
}

function encodeDownlink(input) {

  var finalOutput = {"bytes" : [],
                     "data" : [],
                     "fPort" : input.fPort,
                     "warnings" : [],
                     "errors" : []};
  var element = {};
  var index = 0;
  var updatedOutput = {};

  for (var row in input.data) {

    if (row == "Message Type") {
      if (input.data[row] == "Configuration Get") {
        finalOutput.bytes.push(DOWNLINK_MSG_TYPE_GET_SENSOR_CONFIG);
        index++;
        for (row in input.data) {
          if (row == "Parameters") {
            for (var parameter in input.data[row]) {
              finalOutput = encodeGetDownlinkElement(finalOutput,
                                                     input.data[row][parameter]);
              index++;
            }
            break;
          }
        }
      }
      else if (input.data[row] == "Configuration Set") {
        finalOutput.bytes.push(DOWNLINK_MSG_TYPE_SET_SENSOR_CONFIG);
        index++;
        for (row in input.data) {
          if (row != "Message Type") {
            element = {name: row, value : input.data[row]};
            updatedOutput = encodeSetDownlinkElement(finalOutput,
                                                     index,
                                                     element);
            index = updatedOutput.updatedIndex;
            finalOutput = updatedOutput.updatedInput;
          }
        }
        break;
      }
      else
      {
        finalOutput.errors.push(
          "Unknown command type requested for encoding.");
        break;
      }
    }
  }
  if (finalOutput.errors.length) {
    finalOutput.bytes = []
  }
  else {
    finalOutput.data = finalOutput.bytes;
  }
  return(finalOutput);
}


function encodeSetDownlinkElement(input, index, element) {

  var output = {updatedIndex : index, updatedOutput : {}};
  var elementFound = false;

  for (var row in parameterTableEncodeNS1) {

    if (element.name === row) {
      elementFound = true;
      if (parameterTableEncodeNS1[row].access.indexOf("w") !== -1) {
      
        input.bytes.push(parameterTableEncodeNS1[row].tag & (0xFF));
        index++;
        output = parameterTableEncodeNS1[row].encoder(element,
                                                      parameterTableEncodeNS1[row],
                                                      index);
        if (output.errors !== "") {
          input.errors.push(output.errors);
        }
        else {
          input.bytes = input.bytes.concat(output.encodedValue);
        }
        break;
      }
      else {
        input.errors.push("Can't write read-only parameter " +
                           element.name + ".");
        break;
      }
    }
  }
  if (elementFound === false) {
    input.errors.push("Parameter " + element.name + " cannot be found.");
  }
  output.updatedInput = input;
  return(output);
}

function encodeGetDownlinkElement(input, elementName) {

  var elementFound = false;

  for (var row in parameterTableEncodeNS1) {

    if (elementName === row) {
      if (parameterTableEncodeNS1[row].access.indexOf("r") !== -1) {
        input.bytes.push(parameterTableEncodeNS1[row].tag & (0xFF));
      }
      else
      {
        input.errors.push("Can't read write-only parameter " +
                          elementName + ".");
      }
      elementFound = true;
      break;
    }
  }
  if (elementFound === false) {
    input.errors.push("Unknown parameter " + elementName + ".");
  }
  return(input);
}


function encodeUInt8(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value >= _elementDetails.min) &&
      (element.value <= _elementDetails.max)) {
    output.encodedValue.push(element.value & 0xFF);
    output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
  }
  else {
    output.errors = ("Value out of range for " + element.name + ".");
  }
  return(output);
}

function encodeUInt16(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value >= _elementDetails.min) &&
      (element.value <= _elementDetails.max)) {
    output.encodedValue.push((element.value >> 8) & 0xFF);
    output.encodedValue.push(element.value & 0xFF);
    output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 ;
  }
  else {
    output.errors = ("Value out of range for " + element.name + ".");
  }
  return(output);
}

function encodeEnum(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};
  var enumEncoded = false;

  for (var elementEnumMember in _elementDetails.enumName) {
    if (element.value == elementEnumMember) {
      output.encodedValue.push(_elementDetails.
        enumName[elementEnumMember] & 0xFF);
      output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_ENUM;
      enumEncoded = true;
      break;
    }
  }
  if (enumEncoded === false) {
    output.errors = ("Can't encode enum value " + element.value + ".");
  }
  return(output);
}

function encodeUTCSeconds(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};
  var date = new Date(element.value);
  var utcSeconds = Math.floor(date.getTime() / 1000);

  output.encodedValue.push((utcSeconds >> 24) & 0xFF);
  output.encodedValue.push((utcSeconds >> 16) & 0xFF);
  output.encodedValue.push((utcSeconds >> 8) & 0xFF);
  output.encodedValue.push(utcSeconds & 0xFF);
  output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS;
  return(output);
}

function encodeCharString(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value.length >= _elementDetails.min) &&
      (element.value.length <= _elementDetails.max)) {

    for (var i = 0; i < element.value.length; i++) {
      output.encodedValue.push(element.value.charCodeAt(i));
    }
    output.encodedValue.push(0x0);
    output.updatedIndex = index + output.encodedValue.length;
  }
  else {
    output.errors = ("Too many or too few characters for " + element.name + ".");
  }
  return(output);
}

function encodeAction(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};
  return(output);
}
