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
// Uplink Message Ids.
//*****************************************************************************
const UPLINK_MSG_TYPE_SENSOR_DATA = 0;
const UPLINK_MSG_TYPE_SENSOR_CONFIG = 1;

//*****************************************************************************
// Message element sizes in bytes.
//*****************************************************************************
//*****************************************************************************
// Basic type sizes in bytes.
//*****************************************************************************
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 = 1;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8 = 1;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 = 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT16 = 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32 = 4;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT32 = 4;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT = 4;

//*****************************************************************************
// Derived type sizes in bytes.
//*****************************************************************************
// The first byte of every message consists of the command id and the API
// version.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_COMMAND_API = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
// The message header consists of two bytes (Command Id/API Version & Device
// Status).
const UPLINK_MSG_TYPE_ELEMENT_SIZE_HEADER = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 2;
// Each message element is prefixed with a byte wide tag used to indicate its
// context.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
// Null characters occupy single bytes.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_NULL = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
// Enums currently occupy single bytes.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_ENUM = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
// Standard width temperatures occupy two bytes.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 2;
// Wide temperature values occupy four bytes.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 4;
// UTC seconds occupy 4 bytes in uplink messages.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32;
// The aggregate count is a single byte that indicates how many readings are
// contained within an aggregate uplink element.
const UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;

//*****************************************************************************
// Enumerations for decoding.
//*****************************************************************************
var enumDecodeSensorType = {
  0 : "None",
  1 : "Internal Temperature Sensor",
  2 : "External Thermistor",
  3 : "External One-Wire",
  4 : "External Contact Sensor",
  5 : "External Leak Detector",
  6 : "External I2C",
  7 : "External SPI"
};

var enumDecodeAuRegion = {
  0 : "AU915",
  1 : "AU923"
};

var enumDecodeDeviceType = {
  0 : "RM1261",
  1 : "RM1262"
};

var enumDecodeRtcUpdateMode = {
  0 : "Automatic",
  1 : "Manual"
};

var enumDecodeAggregationMode = {
  0 : "None",
  1 : "Aggregation",
  2 : "Averaging"
};

var enumDecodeLorawanState = {
  0 : "Idle",
  1 : "Joining",
  2 : "Joined",
  3 : "TX",
  4 : "RX",
  5 : "Disconnected"
};

var enumDecodeRegion = {
  0 : "Unconfigured",
  1 : "EU868",
  3 : "US915",
  4 : "AU915",
  5 : "AU923",
  6 : "NZ923"
};

// Bools are treated as enumerations with only two values.
var enumDecodeBool = {
  0 : "False",	
  1 : "True"
};

// The Battery Status is not included in the parameter tables, but is declared
// as an enumeration here to use the enum decoding functionality.
var enumDecodeBatteryStatus = {
  1 : "Critical",
  2 : "Bad",
  3 : "Good"
};

//*****************************************************************************
// Decode parameter table for namespace 0 (sensor reading uplink data).
//*****************************************************************************
var parameterTableDecodeNS0 = {
  0 : {"name" : "Temperature",           "decoder" : decodeTemperature},
  1 : {"name" : "Temperature Backlog",   "decoder" : decodeTemperatureBacklog},
  2 : {"name" : "Temperature Aggregate", "decoder" : decodeTemperatureAggregate},
  3 : {"name" : "Temperature",           "decoder" : decodeWideTemperature},
  4 : {"name" : "Temperature Backlog",   "decoder" : decodeWideTemperatureBacklog},
  5 : {"name" : "Temperature Aggregate", "decoder" : decodeWideTemperatureAggregate}
};

//*****************************************************************************
// Decode parameter table for namespace 1 (sensor parameter uplink data).
//*****************************************************************************
var parameterTableDecodeNS1 = {
  0 :  { "name" : "Friendly Name",              "decoder" : decodeCharString },
  1 :  { "name" : "Sensor Type",                "decoder" : decodeEnum,      "enumName" : enumDecodeSensorType },
  2 :  { "name" : "Sensor Update Rate",         "decoder" : decodeUInt16 },
  3 :  { "name" : "BLE Address",                "decoder" : decodeHexString, "length" : 14 },
  5 :  { "name" : "AU Region",                  "decoder" : decodeEnum,      "enumName" : enumDecodeAuRegion },
  6 :  { "name" : "Confirmed Packets",          "decoder" : decodeEnum,      "enumName" : enumDecodeBool },
  7 :  { "name" : "Confirmed Retry Count",      "decoder" : decodeUInt8 },
  8 :  { "name" : "Current TX Power",           "decoder" : decodeUInt8 },
  11 : { "name" : "LoRaWAN Connection Status",  "decoder" : decodeEnum,      "enumName" : enumDecodeBool },
  12 : { "name" : "LoRaWAN RX Packet Count",    "decoder" : decodeUInt32 },
  13 : { "name" : "LoRaWAN SNR",                "decoder" : decodeInt8 },
  14 : { "name" : "LoRaWAN State",              "decoder" : decodeEnum,      "enumName" : enumDecodeLorawanState },
  15 : { "name" : "LoRaWAN TX Packet Count",    "decoder" : decodeUInt32 },
  16 : { "name" : "Max TX Power",               "decoder" : decodeUInt8 },
  17 : { "name" : "Region",                     "decoder" : decodeEnum,      "enumName" : enumDecodeRegion },
  18 : { "name" : "Sub-band",                   "decoder" : decodeUInt8 },
  19 : { "name" : "Aggregation Count",          "decoder" : decodeUInt8 },
  20 : { "name" : "Aggregation Mode",           "decoder" : decodeEnum,      "enumName" : enumDecodeAggregationMode },
  23 : { "name" : "Device Type",                "decoder" : decodeEnum,      "enumName" : enumDecodeDeviceType },
  26 : { "name" : "Host FW Version",            "decoder" : decodeCharString },
  27 : { "name" : "Host Script Version",        "decoder" : decodeCharString },
  30 : { "name" : "RM126x FW Version",          "decoder" : decodeCharString },
  31 : { "name" : "RTC Time",                   "decoder" : decodeUTCSeconds },
  33 : { "name" : "Thermistor 560 Cal Actual",  "decoder" : decodeDualFloat },
  34 : { "name" : "Thermistor 330k Cal Actual", "decoder" : decodeDualFloat },
  35 : { "name" : "Heartbeat LED Flash Period", "decoder" : decodeUInt8 },
  36 : { "name" : "BLE RSSI",                   "decoder" : decodeInt8 },
  37 : { "name" : "BLE TX Power",               "decoder" : decodeInt8 },
  38 : { "name" : "Device Model",               "decoder" : decodeCharString },
  39 : { "name" : "LoRaWAN Packet Protocol",    "decoder" : decodeUInt8 },
  40 : { "name" : "RTC Update Mode",            "decoder" : decodeEnum,      "enumName" : enumDecodeRtcUpdateMode },
  41 : { "name" : "LoRaWAN RSSI",               "decoder" : decodeUInt8 },
  42 : { "name" : "LoRaWAN Data Rate",          "decoder" : decodeUInt8 },
};

//*****************************************************************************
// Public functions.
//*****************************************************************************

//*****************************************************************************
// Entry point for Chirpstack v3.
// @param fPort [in] The port where the message arrived.
// @param bytes [in] Byte array containing the message data.
// @param variables [in] Unused data provided by Chirpstack.
// @output Decoded message data as JSON object.
//*****************************************************************************
function Decode(fPort, bytes, variables) {

  var input = {};
  var output = {};
  
  input = Object.assign({"fPort" : fPort}, input);
  input = Object.assign({"bytes" : bytes}, input);
  input = Object.assign({"variables" : variables}, input);

  output = decodeUplink(input);

  return(output);
}

//*****************************************************************************
// Entry point for Chirpstack v4 & TTI.
// @param input [in] JSON object provided by server.
// @output Decoded message data as JSON object.
//*****************************************************************************
function decodeUplink(input) {

  var output = {};

  if (input.fPort === 0){
    output = {"data": {}};
  }
  else {
    if (input.bytes.length > 0) {
      if (input.bytes[0] == UPLINK_MSG_TYPE_SENSOR_DATA) {
        output = decodeSensorUplink(input.bytes, false);
      }
      else if (input.bytes[0] == UPLINK_MSG_TYPE_SENSOR_CONFIG) {
        output = decodeSensorUplink(input.bytes, true);
      }
    }
  }
  return(output);
}

//*****************************************************************************
// Private functions.
//*****************************************************************************

//*****************************************************************************
// Decodes Sensor uplinks.
// @param input [in] Byte array containing message data.
// @param isConfig [in] Flag that indicates either sensor or config data.
// @output The decoded message JSON object.
//*****************************************************************************
function decodeSensorUplink(input, isConfig) {

  var output = {};
  var finalisedOutput = {};
  var elementOutput = {};
  var index = 0;

  // Process each part of the message
  while (index < input.length)
  {
    // Process the next element
    elementOutput = decodeSensorUplinkElement(input,
                                              output,
                                              index,
                                              isConfig);
    // Get updated output
    output = elementOutput.updatedInput;
    // Update payload index position
    index += elementOutput.bytesProcessed;
  }
  // Then finalise
  finalisedOutput = Object.assign({"data" : output}, finalisedOutput);
  // And exit with decoded output
  return(finalisedOutput);
}

//*****************************************************************************
// Decodes Sensor uplink elements. Each element is prefixed with a
// Tag that indicates the type of data that follows.
// @param input [in] Byte array containing uplink data.
// @param output [in/out] JSON object to have data appended to it.
// @param index [in] Byte array index where element data starts.
// @param isConfig [in] Flag that indicates if this is sensor or config data.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeSensorUplinkElement(input, output, index, isConfig) {

  var updatedInput = {};
  var decodeTable;

  // Message header? If the index is 0, this indicates the start of the message.
  // This is the message header that always consists of two bytes.
  if (index === 0) {
    updatedInput = decodeUplinkMessageHeader(input);
  }
  else {
    // Beyond the message header, elements are added by tag then value
    if (!isConfig) {
      decodeTable = parameterTableDecodeNS0;
    }
    else {
      decodeTable =  parameterTableDecodeNS1;
    }
    // Now look up the element via its tag
    for (var row in decodeTable) {
      if (row == input[index]) {
        updatedInput = decodeTable[row].decoder(input,
                                                output,
                                                index, 
                                                decodeTable[row]
                                               );
        break;
      }
    }
  }
  return(updatedInput);
}

//*****************************************************************************
// Element decoder functions. Convert message elements to discrete JSON
// objects.
//*****************************************************************************

//*****************************************************************************
// Decodes uplink message header data. The message header consists of two bytes.
// The first byte contains the uplink command id and API version supported by
// the device sending the uplink. The second byte consists of the battery
// status and device status.
// @param input [in] Byte holding data to be decoded.
// @output Initial 'output' JSON object.
//*****************************************************************************
function decodeUplinkMessageHeader(input) {

  var batteryStatus;
  var deviceStatus;
  var batteryStatusValue;
  var deviceStatusValue;
  var output = {};
  var status = decodeUInt8Value(input,
                                UPLINK_MSG_TYPE_ELEMENT_SIZE_COMMAND_API);

  // Battery Status is upper two bits
  batteryStatus = status >> 6;
  // Device Status Bits are lower six bits
  deviceStatus = status & 0x3F;

  // Add battery status
  batteryStatusValue = decodeEnumValue(batteryStatus, enumDecodeBatteryStatus);
  output = {"Battery Status" : batteryStatusValue};

  // Add device status
  deviceStatusValue = decodeDeviceStatusValue(deviceStatus);
  output = Object.assign({"Device Status" : deviceStatusValue}, output);

  // And exit with updated output
  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_HEADER});
}

//*****************************************************************************
// Decodes an 8Bit type uplink message element.
// @param input [in] Byte array holding data to be decoded.
// @param output [in/out] JSON object to have data appended to it.
// @param index [in] Index in the byte array where data resides.
// @param _elementDetails [in] Element data descriptor.
// @output Updated 'output' JSON object.
//*****************************************************************************
function decodeUInt8(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUInt8Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes read out of the array and the updated
  // output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8});
}

//*****************************************************************************
// Decodes a signed 8Bit type uplink message element.
// @param input [in] Byte array holding data to be decoded.
// @param output [in/out] JSON object to have data appended to it.
// @param index [in] Index in the byte array where data resides.
// @param _elementDetails [in] Element data descriptor.
// @output Updated 'output' JSON object.
//*****************************************************************************
function decodeInt8(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeInt8Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);
  // Then exit with the number of bytes read out of the array and the updated
  // output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8});
}

//*****************************************************************************
// Decodes a 16Bit type uplink message element from big endian format.
// @param input [in] Byte array holding data to be decoded.
// @param output [in/out] JSON object to have data appended to it.
// @param index [in] Index in the byte array where data resides.
// @param _elementDetails [in] Element data descriptor.
// @output Updated 'output' JSON object.
//*****************************************************************************
function decodeUInt16(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUInt16Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes read out of the array and the updated
  // output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT16});
}

//*****************************************************************************
// Decodes an unsigned 32-bit type uplink message element.
// @param input [in] Byte array holding data to be decoded.
// @param output [in/out] JSON object to have data appended to it.
// @param index [in] Index in the byte array where data resides.
// @param _elementDetails [in] Element data descriptor.
// @output Updated 'output' JSON object.
//*****************************************************************************
function decodeUInt32(input, output, index, _elementDetails) {

  var decoded;

  // Extract the unisgned 32-bit data
  decoded = decodeUInt32Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes read out from the array and the updated
  // output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32});
}

//*****************************************************************************
// Decodes a character string message element. Character strings must be
// terminated with a NULL character. This results in all character strings
// having a minimum length of 1, where the character string is blank but still
// requires one byte width for the NULL character.
// @param input [in] Byte array where char string element starts.
// @param output [in/out] JSON object to append decoded data to.
// @param index [in] Byte array index where data to be decoded starts.
// @param _elementDetails [in] Char string data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeCharString(input, output, index, _elementDetails) {

  var decoded;

  // Extract the string data
  decoded = decodeCharStringValue(input, index +
                                         UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Add into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes read from the array and the updated
  // output.
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_NULL +
                                 decoded.length});
}

//*****************************************************************************
// Decodes a hex string message element. Hex strings are not null terminated
// and the full width is always returned by the device. Hex strings are fixed
// width, the number of characters is always the same.
// @param input [in] Byte array where data to be decoded resides.
// @param index [in] Byte array index where data to be decoded starts.
// @param output [in] JSON object to append decoded data to.
// @param _elementDetails [in] Hex string data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeHexString(input, output, index, _elementDetails) {

  var decoded;

  // Extract the hex string data
  decoded = decodeHexStringValue(input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG,
                                 _elementDetails.length);

  // Then fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes read from the array and the updated
  // output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 decoded.length});
}

//*****************************************************************************
// Decodes an enum type uplink message element.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Byte array index where enumeration element starts.
// @param _elementDetails [in] Enum data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeEnum(input, output, index, _elementDetails) {

  var decoded;
  
  // Get textual version of enumeration value
  decoded = decodeEnumValue(input[index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG],
                            _elementDetails.enumName);

  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);

  // Then exit with the number of bytes added and the updated output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_ENUM});
}

//*****************************************************************************
// Decodes standard temperature data. The temperature data consists of two
// bytes in fixed point format.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Byte array index where element data starts.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeTemperature(input, output, index, _elementDetails)
{
  // Skip over the tag here
  var temperature = decodeTemperatureValue(input,
                                           index +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Add the temperature value
  output = Object.assign({"Temperature" : temperature}, output);

  // And exit with updated output
  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD});
}

//*****************************************************************************
// Decodes wide temperature data. The temperature data consists of four bytes
// in fixed point format.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Byte array index where data starts.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeWideTemperature(input, output, index, _elementDetails)
{
  // Skip over the tag here
  var temperature = decodeWideTemperatureValue(input,
                                               index +
                                               UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Add the temperature value
  output = Object.assign({"Temperature" : temperature}, output);

  // And exit with updated output
  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE});
}

//*****************************************************************************
// Decodes uplink temperature backlog data. Each backlog consists of a 4 byte
// UTC timestamp and two byte temperature value.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Index of start of element data in byte array.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeTemperatureBacklog(input, output, index, _elementDetails)
{
  // Inner object for packaging the backlog data
  var innerObject = {};
  // Converted temperature value  
  var temperature;

  // Each backlog temperature consists of a timestamp and the value
  // First format the timestamp. Offset of one here to skip over the tag
  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(input,
                                                     index +
                                                     UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG)},
                              innerObject);

  // Then get the temperature value. Offset to account for timestamp and tag
  temperature = decodeTemperatureValue(input, index +
                                              UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                              UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS);
  innerObject = Object.assign({"Temperature" : temperature}, innerObject);

  // Package up into the output object
  output = Object.assign({"Temperature Backlog" : innerObject}, output);

  // Then exit with the updated output and count of processed bytes
  return({updatedInput : output,
          bytes_processed :
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD});
}

//*****************************************************************************
// Decodes uplink wide temperature backlog data. Each backlog consists of a
// 4-byte UTC timestamp and four-byte temperature value.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Index of start of element data in byte array.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeWideTemperatureBacklog(input, output, index, _elementDetails)
{
  // Inner object for packaging the backlog data
  var innerObject = {};
  // Converted temperature value  
  var temperature;

  // Each backlog temperature consists of a timestamp and the value
  // First format the timestamp. Offset of one here to skip over the tag
  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(input,
                                                     index +
                                                     UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG)},
                              innerObject);

  // Then get the temperature value. Offset to account for timestamp and tag
  temperature = decodeWideTemperatureValue(input,
                                           index +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS);
  innerObject = Object.assign({"Temperature" : temperature}, innerObject);

  // Package up into the output object
  output = Object.assign({"Temperature Backlog" : innerObject}, output);

  // Then exit with the updated output and count of processed bytes
  return({updatedInput : output,
          bytes_processed :
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE});
}

//*****************************************************************************
// Decodes uplink temperature aggregate data. This consists of a count of
// included temperature aggregates, the timestamp associated with the first
// aggregate value and a list of aggregate temperatures.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Index of start of element data in byte array.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeTemperatureAggregate(input, output, index, _elementDetails)
{
  // Aggregate temperatures consist of the number of readings,
  // the timestamp of the first reading, and at least one reading
  var aggregateCount = decodeUInt8Value(input,
                                        index +
                                        UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Get the total number of bytes that will be processed
  var bytesProcessed = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
                       (UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD * aggregateCount);

  // Inner object to hold aggregate data
  var innerObject = {};
  // Object to hold aggregate results
  var aggregateObject = {};
  // Index into the payload for aggregate results
  var aggregateIndex;
  // Next converted temperature value  
  var temperature;

  // First add the aggregate count
  innerObject = Object.assign({"Aggregate Count" : aggregateCount},
                              innerObject);

  // Add the timestamp of the first aggregate reading
  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(
                                 input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT)},
                              innerObject);

  // Now format in the individual temperatures
  aggregateIndex = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS;
  
  // 'aggregateCount' is used to label each aggregate value
  aggregateCount = 1;
  while (aggregateIndex < bytesProcessed) {
    // Get the next temperature value
    temperature = decodeTemperatureValue(input, index + aggregateIndex);
    aggregateObject = Object.assign({["Temperature " + aggregateCount] :
                                      temperature}, aggregateObject);
    // Move on to the next aggregate
    aggregateIndex += UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD;
    aggregateCount++;
  }
  // Package up aggregate data
  innerObject = Object.assign({"Aggregate Temperatures" :
                               aggregateObject}, innerObject);

  // And finally fold into the upper object
  output = Object.assign({"Aggregate Temperature" : innerObject}, output);

  // Then exit with the number of bytes added and the updated output
  return({updatedInput : output, bytesProcessed : bytesProcessed});
}

//*****************************************************************************
// Decodes uplink wide temperature aggregate data. This consists of a count of
// included temperature aggregates, the timestamp associated with the first
// aggregate value and a list of aggregate temperatures.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Index of start of element data in byte array.
// @param _elementDetails [in] Unused data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeWideTemperatureAggregate(input, output, index, _elementDetails)
{
  // Aggregate temperatures consist of the number of readings,
  // the timestamp of the first reading, and at least one reading
  var aggregateCount = decodeUInt8Value(input,
                                        index +
                                        UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  // Get the total number of bytes that will be processed
  var bytesProcessed = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
                       (UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE * aggregateCount);

  // Inner object to hold aggregate data
  var innerObject = {};
  // Object to hold aggregate results
  var aggregateObject = {};
  // Index into the payload for aggregate results
  var aggregateIndex;
  // Next converted temperature value  
  var temperature;

  // First add the aggregate count
  innerObject = Object.assign({"Aggregate Count" : aggregateCount},
                              innerObject);

  // Add the timestamp of the first aggregate reading
  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(
                                 input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT)},
                              innerObject);

  // Now format in the individual temperatures
  aggregateIndex = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS;
  
  // 'aggregateCount' is used to label each aggregate value
  aggregateCount = 1;
  while (aggregateIndex < bytesProcessed) {
    // Get the next temperature value
    temperature = decodeWideTemperatureValue(input, index + aggregateIndex);
    aggregateObject = Object.assign({["Temperature " + aggregateCount] :
                                      temperature}, aggregateObject);
    // Move on to the next aggregate
    aggregateIndex += UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE;
    aggregateCount++;
  }
  // Package up aggregate data
  innerObject = Object.assign({"Aggregate Temperatures" :
                               aggregateObject}, innerObject);

  // And finally fold into the upper object
  output = Object.assign({"Aggregate Temperature" : innerObject}, output);

  // Then exit with the number of bytes added and the updated output
  return({updatedInput : output, bytesProcessed : bytesProcessed});
}

//*****************************************************************************
// Decodes a UTC Seconds type uplink message element.
// @param input [in] Byte array of binary message data.
// @param output [in/out] JSON object to have data appended.
// @param index [in] Index of start of element data in byte array.
// @param _elementDetails [in] UTC parameter data descriptor.
// @return Updated 'output' JSON object.
//*****************************************************************************
function decodeUTCSeconds(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUTCSecondsValue(input, index +
                                         UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);
  // Fold into the upper object
  output = Object.assign({[_elementDetails.name] : decoded}, output);
  // Then exit with the number of bytes processed and the updated output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS});
}

//*****************************************************************************
// Decodes a dual float structure.
// @param input [in] The input byte array to decode data from.
// @param output [in/out] The JSON object that will have decoded data appended
//                        to it.
// @param index [in] Index into the 'input' array where data starts.
// @param _elementDetails [in] Decode table data descriptor.
// @return Updated version of 'output' JSON object.
//*****************************************************************************
function decodeDualFloat(input, output, index, _elementDetails) {

  var decodedFloat1;
  var decodedFloat2;
  var innerObject;

  // Decode both float values
  decodedFloat1 = decodeFloatValue(input,
                                   index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);
  decodedFloat2 = decodeFloatValue(input,
                                   index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                   UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT);
  // Build the inner object
  innerObject = {"Value 1" : decodedFloat1, "Value 2" : decodedFloat2};
  // Then fold into the outer object
  output = Object.assign({[_elementDetails.name] : innerObject}, output);
  // Then exit with the number of bytes added and the updated output
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT});
}

//*****************************************************************************
// Value decoder functions. Convert bytes to discrete decoded values.
//*****************************************************************************

//*****************************************************************************
// Helper function for decoding a uint8.
// @param input [in] The byte array to decode the uint8 from.
// @param index [in] Index in the byte array where to decode data.
// @return The decoded uint8.
//*****************************************************************************
function decodeUInt8Value(input, index) {

  var decoded;

  decoded = input[index] & 0xFF;
  return(decoded);
}

//*****************************************************************************
// Helper function for decoding a int8. Using ArrayBuffer here for consistency
// with later value decoders.
// @param input [in] The byte array to decode the int8 from.
// @param index [in] Index in the byte array where to decode data.
// @return The decoded int8.
//*****************************************************************************
function decodeInt8Value(input, index) {

  var decoded;
  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8);
  var dataView = new DataView(arrayBuffer);

  dataView.setInt8(0, input[index] & 0xFF);
  decoded = dataView.getInt8(0, false);
  return(decoded);
}

//*****************************************************************************
// Helper function for decoding unsigned 16-bit values from big endian byte
// array data.
// @param input [in] Byte array being decoded.
// @param index [in] Index in the byte array where the unsigned 16-bit data
//                   resides.
// @return The decoded unsigned 16-bit data.
//*****************************************************************************
function decodeUInt16Value(input, index) {

  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_INT16);
  var uInt8Array = new Uint8Array(arrayBuffer);

  for (i = 0; i < UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT16; i++) {
    uInt8Array[i] = input[index + i] & 0xFF;
  }

  var dataView = new DataView(arrayBuffer);
  value = dataView.getUint16(0, false);
  return(value);
}

//*****************************************************************************
// Helper function for decoding signed 16-bit values from big endian byte
// array data.
// @param input [in] Byte array being decoded.
// @param index [in] Index in the byte array where the signed 16-bit data
//                   resides.
// @return The decoded signed 16-bit data.
//*****************************************************************************
function decodeInt16Value(input, index) {

  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_INT16);
  var int8Array = new Int8Array(arrayBuffer);

  for (i = 0; i < UPLINK_MSG_TYPE_ELEMENT_SIZE_INT16; i++) {
    int8Array[i] = input[index + i] & 0xFF;
  }

  var dataView = new DataView(arrayBuffer);
  value = dataView.getInt16(0, false);
  return(value);
}

//*****************************************************************************
// Helper function for decoding unsigned 32-bit values from big endian byte
// array data.
// @param input [in] Byte array being decoded.
// @param index [in] Index in the byte array where the unsigned 32-bit data
//                   resides.
// @return The decoded unsigned 32-bit data.
//*****************************************************************************
function decodeUInt32Value(input, index) {

  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32);
  var uInt8Array = new Uint8Array(arrayBuffer);

  for (i = 0; i < UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32; i++) {
    uInt8Array[i] = input[index + i] & 0xFF;
  }

  var dataView = new DataView(arrayBuffer);
  value = dataView.getUint32(0, false);
  return(value);
}

//*****************************************************************************
// Helper function for decoding signed 32-bit values from big endian byte
// array data.
// @param input [in] Byte array being decoded.
// @param index [in] Index in the byte array where the signed 32-bit data
//                   resides.
// @return The decoded signed 32-bit data.
//*****************************************************************************
function decodeInt32Value(input, index) {

  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_INT32);
  var int8Array = new Int8Array(arrayBuffer);

  for (i = 0; i < UPLINK_MSG_TYPE_ELEMENT_SIZE_INT32; i++) {
    int8Array[i] = input[index + i] & 0xFF;
  }

  var dataView = new DataView(arrayBuffer);
  value = dataView.getInt32(0, false);
  return(value);
}

//*****************************************************************************
// Helper function for decoding a character string. These must be terminated
// with a null character.
// @param input [in] The byte array where the character string data resides.
// @param index [in] Index in the byte array where the string data starts.
// @return The decoded character string.
//*****************************************************************************
function decodeCharStringValue(input, index) {

  var decoded;
  var bytes;
  var stringFromBytes;
  var nullPosition;

  // Get a sub-array from the message starting at the index
  bytes = input.slice(index);
  // Get the ASCII content
  stringFromBytes = String.fromCharCode.apply(null, bytes);
  // Then determine where we need to slice depending on the NULL position
  nullPosition = stringFromBytes.indexOf('\0');
  decoded = stringFromBytes.slice(0, nullPosition);
  return(decoded);
}

//*****************************************************************************
// Helper function for decoding a hexstring.
// @param input [in] The byte array to decode the hexstring from.
// @param index [in] The index where the hexstring data starts.
// @param length [in] The number of bytes to decode.
// @return The decoded hexstring.
//*****************************************************************************
function decodeHexStringValue(input, index, length) {

  var decoded = "0x0";

  // We first get a sub-array from the message bytes starting at the index
  // and convert to ASCII
  decoded = String.fromCharCode.apply(null, input.slice(index));
  // Then slice off unused characters at the end
  decoded = decoded.slice(0, length);
  decoded = '0x' + decoded;
  return(decoded);
}

//*****************************************************************************
// Helper function for returning a decoded standard width temperature value.
// Standard width temperature values indicate between -128 and 127C.
// Temperature data is encoded in fixed point format using a scale factor of
// 256. This results in standard width temperature values occupying two bytes
// in encoded payloads.
// @param input [in] Byte array containing temperature data.
// @param index [in] Byte array index where temperature data starts.
// @return The temperature in single precision floating point format.
//*****************************************************************************
function decodeTemperatureValue(input, index) {

  var signedValue = 0;
  var signedValueFloat;

  // First decode the signed 16-bit data
  signedValue = decodeInt16Value(input, index);
  // Then convert from fixed to floating point
  signedValueFloat = parseInt(signedValue);
  signedValueFloat /= 256.0;
  // And truncate to 2 decimal places. The result of toFixed
  // here is parsed back again to prevent returning a string
  signedValueFloat = parseFloat(signedValueFloat.toFixed(2));
  return(signedValueFloat);
}

//*****************************************************************************
// Helper function for returning a decoded wide temperature value. 
// Wide temperature values indicate between -32768 to 32767C.
// Temperature data is encoded in fixed point format using a scale factor of
// 65536. This results in wide temperature values occupying four bytes in
// encoded payloads.
// @param input [in] Byte array containing temperature data.
// @param index [in] Byte array index where temperature data starts.
// @return The temperature in single precision floating point format.
//*****************************************************************************
function decodeWideTemperatureValue(input, index) {

  var signedValue = 0;
  var signedValueFloat;

  // First decode the signed 32-bit data
  signedValue = decodeInt32Value(input, index);
  // Then convert from fixed to floating point
  signedValueFloat = parseInt(signedValue)
  signedValueFloat /= 65536.0;
  // And truncate to 2 decimal places. The result of toFixed
  // here is parsed back again to prevent returning a string
  signedValueFloat = parseFloat(signedValueFloat.toFixed(2));
  return(signedValueFloat);
}

//*****************************************************************************
// Helper function for returning a string associated with an enumeration value.
// @param input [in] The byte to decode the enum textual data from.
// @param decodeEnum [in] The enum table to extract textual data from. 
// @return The decoded enum value.
//*****************************************************************************
function decodeEnumValue(input, decodeEnum) {

  var decoded = "Unknown";

  for (elementEnumMember in decodeEnum) {
    if (elementEnumMember == input) {
      elementEnumValue = decodeEnum[elementEnumMember];
      decoded = elementEnumValue;
      break;
    }
  }
  return(decoded);
}

//*****************************************************************************
// Helper function for returning a string containing a human readable date
// from a passed 32-bit timestamp in seconds since the UNIX epoch (January 1st,
// 1970, UTC).
// @param input [in] Byte array where data to be decoded resides.
// @param index [in] Index in the byte array where data starts.
// @return The human readable date information.
//*****************************************************************************
function decodeUTCSecondsValue(input, index) {

  // First decode from UInt32 format to get the total number of seconds.
  var utcSeconds = decodeUInt32Value(input, index);
  // Then convert to a date instance.
  // Convert to milliseconds prior to calling constructor.
  var date = new Date(utcSeconds * 1000);
  // And return in UTC format.
  return(date.toUTCString());
}

//*****************************************************************************
// Helper function for decoding single-precision float values.
// @param input [in] Byte array being decoded.
// @param index [in] Index in the byte array where the float data resides.
// @return The decoded float data.
//*****************************************************************************
function decodeFloatValue(input, index) {

  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT);
  var uint8Array = new Uint8Array(arrayBuffer);
  var value;

  for (i = 0 ; i < UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT ; i++) {
    uint8Array[i] = input[index + i] & 0xFF;
  }

  var dataView = new DataView(arrayBuffer);
  value = dataView.getFloat32(0, false);
  return(value);
}

//*****************************************************************************
// Helper function for returning a JS object indicating the device status bit
// conditions.
// @param input [in] The byte to decode the device status from.
// @return The decoded device status.
//*****************************************************************************
function decodeDeviceStatusValue(input) {

  var deviceStatus = {};
  var bitIndex = 0;
  var statusLabels = ["Sensor Fault",
                      "Bandwidth Limitation",
                      "Backlogs Available",
                      "Backlog Wraparound",
                      "Unsupported API Version"];
  var bitStatus;

  while (bitIndex < statusLabels.length) {
    bitStatus = "No";
    if (input & (1 << bitIndex)) {
      bitStatus = "Yes";
    }
    deviceStatus = Object.assign({[statusLabels[bitIndex]] :
                                   bitStatus}, deviceStatus);
    bitIndex++;
  }
  return(deviceStatus);
}
