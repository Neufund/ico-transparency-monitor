export function fastDecodeUint(uint) {
  return parseInt(uint, 16);
}

export function fastDecodeAddress(value) {
  return '0x' + value.slice(value.length - 40, value.length);
}

export const fastDecoders = {
  address: fastDecodeAddress,
  uint256: fastDecodeUint,
}

export function fastDecodeType(typeName, value) {
  const fastDecoder = fastDecoders[typeName];
  if (!fastDecoder) {
    throw new Error(`No decode for type ${typeName}`);
  }

  return fastDecoders[typeName](value);
}

export function fastEventDecoder(eventDescription) {
  const indexedTypes = eventDescription.types(true);
  const notIndexedTypes = eventDescription.types(false);

  if (notIndexedTypes.length != 1) {
    throw new Error("Fast decode supports only 1 not indexed param");
  }

  return (rawEvent) => {
    const argTopics = eventDescription._anonymous ? rawEvent.topics : rawEvent.topics.slice(1);
    const indexedData = argTopics.map(topics => topics.slice(2));
    const indexedParams = indexedTypes.map((typeName, index) => fastDecodeType(typeName, indexedData[index]));

    const notIndexedData = rawEvent.data.slice(2);
    const notIndexedParams = notIndexedTypes.map((typeName) => fastDecodeType(typeName, notIndexedData));

    const args = eventDescription._params.reduce((acc, current) => {
      acc[current.name] = current.indexed ? indexedParams.shift() : notIndexedParams.shift();
      return acc;
    }, {});


    return {
      event: eventDescription.displayName(),
      address: rawEvent.address,
      blockHash: rawEvent.blockHash,
      blockNumber: fastDecodeUint(rawEvent.blockNumber),
      logIndex: fastDecodeUint(rawEvent.logIndex),
      timestamp: rawEvent.timestamp,
      transactionHash: rawEvent.transactionHash,
      transactionIndex: fastDecodeUint(rawEvent.transactionIndex),
      transactionLogIndex: rawEvent.transactionLogIndex,
      type: rawEvent.type,
      value: rawEvent.value,
      args,
    };
  }
}
