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

//*****************************************************************************
// Downlink Message Ids.
//*****************************************************************************
const DOWNLINK_MSG_TYPE_GET_SENSOR_CONFIG = 0;
const DOWNLINK_MSG_TYPE_SET_SENSOR_CONFIG = 1;

//*****************************************************************************
// Message element sizes in bytes.
//*****************************************************************************
//*****************************************************************************
// Basic type sizes in bytes.
//*****************************************************************************
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 = 1;
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 = 2;
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT32 = 4;

//*****************************************************************************
// Derived type sizes in bytes.
//*****************************************************************************
// Enums currently occupy single bytes.
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_ENUM = DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
// UTC seconds occupy 4 bytes in downlink messages.
const DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS = DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT32;

//*****************************************************************************
// Enumerations for encoding.
//*****************************************************************************
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

//*****************************************************************************
// Encode parameter table.
// Access rights take priority - if a value is read only, only the tag can
// be encoded in a downlink so no encoder or parameter properties are needed.
//*****************************************************************************
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

//*****************************************************************************
// Public functions.
//*****************************************************************************

//*****************************************************************************
// Entry point for Chirpstack v3.
// @param input [in] The port where to forward the message.
// @param obj [in] JSON object containing data to encode.
// @param variables [in] Unused data provided by Chirpstack.
// @return JSON object containing the encoded message.
//*****************************************************************************
function Encode(fPort, obj, variables) {

  var input = {};
  var output = {};
  
  input.Object.assign({"fPort" : fPort}, input);
  input.Object.assign({"data" : obj}, input);
  input.Object.assign({"variables" : variables}, input);
	
  output = encodeDownlink(input);
}

//*****************************************************************************
// Entry point for Chirpstack v4 & TTI.
// @param input [in] JSON object containing the message to encode.
// @return JSON object containing the encoded message.
//*****************************************************************************
function encodeDownlink(input) {

  var finalOutput = {"bytes" : [],
                     "data" : [],
                     "fPort" : input.fPort,
                     "warnings" : [],
                     "errors" : []};
  var element = {};
  var index = 0;
  var updatedOutput = {};

  // Find the tag value indicating the downlink message type
  for (var row in input.data) {

    if (row == "Message Type") {
      // Only two types of messages - Configuration Get and Set
      if (input.data[row] == "Configuration Get") {
        finalOutput.bytes.push(DOWNLINK_MSG_TYPE_GET_SENSOR_CONFIG);
        index++;
        // Now work through each tag value pair
        for (row in input.data) {
          // If getting the configuration, parameters for
          // getting are listed in an array called Parameters 
          if (row == "Parameters") {
            // Loop through the list of parameters for encode
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
        // Now work through each tag value pair
        for (row in input.data) {
          // Skip over the message type
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
        // If an unknown command is being encoded, add an error
        finalOutput.errors.push(
          "Unknown command type requested for encoding.");
        // If any errors occur, stop encoding and exit out
        break;
      }
    }
  }
  if (finalOutput.errors.length) {
    // Make encoding atomic - all parameters encoded or none
    finalOutput.bytes = []
  }
  else {
    // For Chirpstack, encoded data is returned in 'data'
    finalOutput.data = finalOutput.bytes;
  }
  return(finalOutput);
}

//*****************************************************************************
// Private functions.
//*****************************************************************************

//*****************************************************************************
// Encodes the next config set downlink element in the passed JSON message.
// Set downlink elements consist of the parameter tag and the associated
// value.
// @param input [in/out] JSON object containing encoded message details.
// @param index [in/out] The index of the next free byte in the input byte
//                       array.
// @param element [in] The row from the JSON message to encode.
// @return Updated 'input' and 'index' values.
//*****************************************************************************
function encodeSetDownlinkElement(input, index, element) {

  var output = {updatedIndex : index, updatedOutput : {}};
  var elementFound = false;

  // Iterate through the parameter table to find a match
  for (var row in parameterTableEncodeNS1) {

    if (element.name === row) {
      // Found requested parameter
      elementFound = true;
      // Do not allow read-only parameters to be written
      if (parameterTableEncodeNS1[row].access.indexOf("w") !== -1) {
      
        // First we add the tag of the item
        input.bytes.push(parameterTableEncodeNS1[row].tag & (0xFF));
        index++;
        // Then encode the value
        output = parameterTableEncodeNS1[row].encoder(element,
                                                      parameterTableEncodeNS1[row],
                                                      index);
        // Check if the encoder emitted an error
        if (output.errors !== "") {
          // If so push it to the output and stop encoding
          input.errors.push(output.errors);
        }
        else {
          // OK to append output to the encoded array
          input.bytes = input.bytes.concat(output.encodedValue);
        }
        break;
      }
      else {
        // Add an error if trying to write a read-only parameter
        input.errors.push("Can't write read-only parameter " +
                           element.name + ".");
        break;
      }
    }
  }
  // Was the parameter found?
  if (elementFound === false) {
    // Add an error if trying to access an unknown parameter
    input.errors.push("Parameter " + element.name + " cannot be found.");
  }
  // Set updated input before exiting
  output.updatedInput = input;
  return(output);
}

//*****************************************************************************
// Encodes the next config get downlink element in the passed JSON message.
// Get downlink elements consist of the parameter tag only and have no
// associated parameter properties.
// @param input [in/out] JSON object containing encoded message details.
// @param elementName [in] Name of the element to encode.
// @return Updated 'input' JSON object.
//*****************************************************************************
function encodeGetDownlinkElement(input, elementName) {

  var elementFound = false;

  // Iterate through the parameter table to find a match
  for (var row in parameterTableEncodeNS1) {

    if (elementName === row) {
      // Do not allow write-only parameters to be read
      if (parameterTableEncodeNS1[row].access.indexOf("r") !== -1) {
        // Add the tag of the item
        input.bytes.push(parameterTableEncodeNS1[row].tag & (0xFF));
      }
      else
      {
        // Add an error if trying to read a write-only parameter
        input.errors.push("Can't read write-only parameter " +
                          elementName + ".");
      }
      // Found our item
      elementFound = true;
      break;
    }
  }
  // If the element was not found, add an error here
  if (elementFound === false) {
    input.errors.push("Unknown parameter " + elementName + ".");
  }
  return(input);
}

//*****************************************************************************
// Element encoders.
//*****************************************************************************

//*****************************************************************************
// Encodes a UInt8 type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] The element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index
//         value and any errors that occurred during encoding.
//*****************************************************************************
function encodeUInt8(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value >= _elementDetails.min) &&
      (element.value <= _elementDetails.max)) {
    output.encodedValue.push(element.value & 0xFF);
    output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
  }
  else {
    // Add an error if out of range
    output.errors = ("Value out of range for " + element.name + ".");
  }
  return(output);
}

//*****************************************************************************
// Encodes a UInt16 type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] The element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index
//         value and any errors that occurred during encoding.
//*****************************************************************************
function encodeUInt16(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value >= _elementDetails.min) &&
      (element.value <= _elementDetails.max)) {
    output.encodedValue.push((element.value >> 8) & 0xFF);
    output.encodedValue.push(element.value & 0xFF);
    output.updatedIndex = index + DOWNLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 ;
  }
  else {
    // Add an error if out of range
    output.errors = ("Value out of range for " + element.name + ".");
  }
  return(output);
}

//*****************************************************************************
// Encodes an enumeration type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] The element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index'
//         value and any errors that occurred during encoding.
//*****************************************************************************
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
    // Add an error if trying to encode an unknown enum value
    output.errors = ("Can't encode enum value " + element.value + ".");
  }
  return(output);
}

//*****************************************************************************
// Encodes an utc seconds type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] Unused element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index'
//         value and any errors that occurred during encoding.
//*****************************************************************************
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

//*****************************************************************************
// Encodes a character string type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] The element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index'
//         value and any errors that occurred during encoding.
//*****************************************************************************
function encodeCharString(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};

  if ((element.value.length >= _elementDetails.min) &&
      (element.value.length <= _elementDetails.max)) {

    for (var i = 0; i < element.value.length; i++) {
      output.encodedValue.push(element.value.charCodeAt(i));
    }
    // Char strings are null teminated
    output.encodedValue.push(0x0);
    output.updatedIndex = index + output.encodedValue.length;
  }
  else {
    // Add an error if trying to encode too many or too few characters
    output.errors = ("Too many or too few characters for " + element.name + ".");
  }
  return(output);
}

//*****************************************************************************
// Encodes an action type downlink message element.
// @param element [in] The row read from the JSON object to encode.
// @param _elementDetails [in] The element data descriptor.
// @param index [in/out] The current index to the encoded message byte array.
// @return Bytes to add to the encoded message byte array, the updated 'index'
//         value and any errors that occurred during encoding.
//*****************************************************************************
function encodeAction(element, _elementDetails, index) {

  var output = {"encodedValue" : [], "updatedIndex" : index, "errors" : ""};
  return(output);
}
