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

const UPLINK_MSG_TYPE_SENSOR_DATA = 0;
const UPLINK_MSG_TYPE_SENSOR_CONFIG = 1;

const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 = 1;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8 = 1;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT16 = 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT16 = 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32 = 4;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_INT32 = 4;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT = 4;

const UPLINK_MSG_TYPE_ELEMENT_SIZE_COMMAND_API = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_HEADER = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_NULL = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_ENUM = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 2;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8 * 4;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32;
const UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT = UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8;

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

var enumDecodeBool = {
  0 : "False",	
  1 : "True"
};

var enumDecodeBatteryStatus = {
  1 : "Critical",
  2 : "Bad",
  3 : "Good"
};

var parameterTableDecodeNS0 = {
  0 : {"name" : "Temperature",           "decoder" : decodeTemperature},
  1 : {"name" : "Temperature Backlog",   "decoder" : decodeTemperatureBacklog},
  2 : {"name" : "Temperature Aggregate", "decoder" : decodeTemperatureAggregate},
  3 : {"name" : "Temperature",           "decoder" : decodeWideTemperature},
  4 : {"name" : "Temperature Backlog",   "decoder" : decodeWideTemperatureBacklog},
  5 : {"name" : "Temperature Aggregate", "decoder" : decodeWideTemperatureAggregate}
};

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


function Decode(fPort, bytes, variables) {

  var input = {};
  var output = {};
  
  input = Object.assign({"fPort" : fPort}, input);
  input = Object.assign({"bytes" : bytes}, input);
  input = Object.assign({"variables" : variables}, input);

  output = decodeUplink(input);

  return(output);
}

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


function decodeSensorUplink(input, isConfig) {

  var output = {};
  var finalisedOutput = {};
  var elementOutput = {};
  var index = 0;

  while (index < input.length)
  {
    elementOutput = decodeSensorUplinkElement(input,
                                              output,
                                              index,
                                              isConfig);
    output = elementOutput.updatedInput;
    index += elementOutput.bytesProcessed;
  }
  finalisedOutput = Object.assign({"data" : output}, finalisedOutput);
  return(finalisedOutput);
}

function decodeSensorUplinkElement(input, output, index, isConfig) {

  var updatedInput = {};
  var decodeTable;

  if (index === 0) {
    updatedInput = decodeUplinkMessageHeader(input);
  }
  else {
    if (!isConfig) {
      decodeTable = parameterTableDecodeNS0;
    }
    else {
      decodeTable =  parameterTableDecodeNS1;
    }
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


function decodeUplinkMessageHeader(input) {

  var batteryStatus;
  var deviceStatus;
  var batteryStatusValue;
  var deviceStatusValue;
  var output = {};
  var status = decodeUInt8Value(input,
                                UPLINK_MSG_TYPE_ELEMENT_SIZE_COMMAND_API);

  batteryStatus = status >> 6;
  deviceStatus = status & 0x3F;

  batteryStatusValue = decodeEnumValue(batteryStatus, enumDecodeBatteryStatus);
  output = {"Battery Status" : batteryStatusValue};

  deviceStatusValue = decodeDeviceStatusValue(deviceStatus);
  output = Object.assign({"Device Status" : deviceStatusValue}, output);

  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_HEADER});
}

function decodeUInt8(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUInt8Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT8});
}

function decodeInt8(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeInt8Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({[_elementDetails.name] : decoded}, output);
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8});
}

function decodeUInt16(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUInt16Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT16});
}

function decodeUInt32(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUInt32Value(input, index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UINT32});
}

function decodeCharString(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeCharStringValue(input, index +
                                         UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_NULL +
                                 decoded.length});
}

function decodeHexString(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeHexStringValue(input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG,
                                 _elementDetails.length);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 decoded.length});
}

function decodeEnum(input, output, index, _elementDetails) {

  var decoded;
  
  decoded = decodeEnumValue(input[index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG],
                            _elementDetails.enumName);

  output = Object.assign({[_elementDetails.name] : decoded}, output);

  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_ENUM});
}

function decodeTemperature(input, output, index, _elementDetails)
{
  var temperature = decodeTemperatureValue(input,
                                           index +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({"Temperature" : temperature}, output);

  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD});
}

function decodeWideTemperature(input, output, index, _elementDetails)
{
  var temperature = decodeWideTemperatureValue(input,
                                               index +
                                               UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  output = Object.assign({"Temperature" : temperature}, output);

  return({updatedInput : output,
          bytesProcessed : UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE});
}

function decodeTemperatureBacklog(input, output, index, _elementDetails)
{
  var innerObject = {};
  var temperature;

  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(input,
                                                     index +
                                                     UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG)},
                              innerObject);

  temperature = decodeTemperatureValue(input, index +
                                              UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                              UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS);
  innerObject = Object.assign({"Temperature" : temperature}, innerObject);

  output = Object.assign({"Temperature Backlog" : innerObject}, output);

  return({updatedInput : output,
          bytes_processed :
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD});
}

function decodeWideTemperatureBacklog(input, output, index, _elementDetails)
{
  var innerObject = {};
  var temperature;

  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(input,
                                                     index +
                                                     UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG)},
                              innerObject);

  temperature = decodeWideTemperatureValue(input,
                                           index +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                           UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS);
  innerObject = Object.assign({"Temperature" : temperature}, innerObject);

  output = Object.assign({"Temperature Backlog" : innerObject}, output);

  return({updatedInput : output,
          bytes_processed :
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
          UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE});
}

function decodeTemperatureAggregate(input, output, index, _elementDetails)
{
  var aggregateCount = decodeUInt8Value(input,
                                        index +
                                        UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  var bytesProcessed = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
                       (UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD * aggregateCount);

  var innerObject = {};
  var aggregateObject = {};
  var aggregateIndex;
  var temperature;

  innerObject = Object.assign({"Aggregate Count" : aggregateCount},
                              innerObject);

  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(
                                 input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT)},
                              innerObject);

  aggregateIndex = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS;
  
  aggregateCount = 1;
  while (aggregateIndex < bytesProcessed) {
    temperature = decodeTemperatureValue(input, index + aggregateIndex);
    aggregateObject = Object.assign({["Temperature " + aggregateCount] :
                                      temperature}, aggregateObject);
    aggregateIndex += UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_STD;
    aggregateCount++;
  }
  innerObject = Object.assign({"Aggregate Temperatures" :
                               aggregateObject}, innerObject);

  output = Object.assign({"Aggregate Temperature" : innerObject}, output);

  return({updatedInput : output, bytesProcessed : bytesProcessed});
}

function decodeWideTemperatureAggregate(input, output, index, _elementDetails)
{
  var aggregateCount = decodeUInt8Value(input,
                                        index +
                                        UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);

  var bytesProcessed = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                       UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS +
                       (UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE * aggregateCount);

  var innerObject = {};
  var aggregateObject = {};
  var aggregateIndex;
  var temperature;

  innerObject = Object.assign({"Aggregate Count" : aggregateCount},
                              innerObject);

  innerObject = Object.assign({"Timestamp" :
                               decodeUTCSecondsValue(
                                 input,
                                 index +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT)},
                              innerObject);

  aggregateIndex = UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_AGGREGATE_COUNT +
                   UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS;
  
  aggregateCount = 1;
  while (aggregateIndex < bytesProcessed) {
    temperature = decodeWideTemperatureValue(input, index + aggregateIndex);
    aggregateObject = Object.assign({["Temperature " + aggregateCount] :
                                      temperature}, aggregateObject);
    aggregateIndex += UPLINK_MSG_TYPE_ELEMENT_SIZE_TEMP_WIDE;
    aggregateCount++;
  }
  innerObject = Object.assign({"Aggregate Temperatures" :
                               aggregateObject}, innerObject);

  output = Object.assign({"Aggregate Temperature" : innerObject}, output);

  return({updatedInput : output, bytesProcessed : bytesProcessed});
}

function decodeUTCSeconds(input, output, index, _elementDetails) {

  var decoded;

  decoded = decodeUTCSecondsValue(input, index +
                                         UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);
  output = Object.assign({[_elementDetails.name] : decoded}, output);
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_UTC_SECONDS});
}

function decodeDualFloat(input, output, index, _elementDetails) {

  var decodedFloat1;
  var decodedFloat2;
  var innerObject;

  decodedFloat1 = decodeFloatValue(input,
                                   index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG);
  decodedFloat2 = decodeFloatValue(input,
                                   index + UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                   UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT);
  innerObject = {"Value 1" : decodedFloat1, "Value 2" : decodedFloat2};
  output = Object.assign({[_elementDetails.name] : innerObject}, output);
  return({updatedInput : output, bytesProcessed :
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_TAG +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT +
                                 UPLINK_MSG_TYPE_ELEMENT_SIZE_FLOAT});
}


function decodeUInt8Value(input, index) {

  var decoded;

  decoded = input[index] & 0xFF;
  return(decoded);
}

function decodeInt8Value(input, index) {

  var decoded;
  var arrayBuffer = new ArrayBuffer(UPLINK_MSG_TYPE_ELEMENT_SIZE_INT8);
  var dataView = new DataView(arrayBuffer);

  dataView.setInt8(0, input[index] & 0xFF);
  decoded = dataView.getInt8(0, false);
  return(decoded);
}

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

function decodeCharStringValue(input, index) {

  var decoded;
  var bytes;
  var stringFromBytes;
  var nullPosition;

  bytes = input.slice(index);
  stringFromBytes = String.fromCharCode.apply(null, bytes);
  nullPosition = stringFromBytes.indexOf('\0');
  decoded = stringFromBytes.slice(0, nullPosition);
  return(decoded);
}

function decodeHexStringValue(input, index, length) {

  var decoded = "0x0";

  decoded = String.fromCharCode.apply(null, input.slice(index));
  decoded = decoded.slice(0, length);
  decoded = '0x' + decoded;
  return(decoded);
}

function decodeTemperatureValue(input, index) {

  var signedValue = 0;
  var signedValueFloat;

  signedValue = decodeInt16Value(input, index);
  signedValueFloat = parseInt(signedValue);
  signedValueFloat /= 256.0;
  signedValueFloat = parseFloat(signedValueFloat.toFixed(2));
  return(signedValueFloat);
}

function decodeWideTemperatureValue(input, index) {

  var signedValue = 0;
  var signedValueFloat;

  signedValue = decodeInt32Value(input, index);
  signedValueFloat = parseInt(signedValue)
  signedValueFloat /= 65536.0;
  signedValueFloat = parseFloat(signedValueFloat.toFixed(2));
  return(signedValueFloat);
}

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

function decodeUTCSecondsValue(input, index) {

  var utcSeconds = decodeUInt32Value(input, index);
  var date = new Date(utcSeconds * 1000);
  return(date.toUTCString());
}

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
