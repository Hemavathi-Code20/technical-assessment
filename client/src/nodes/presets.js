export const nodePresets = {
  customInput: {
    title: 'Input',
    color: '#1E3A8A',
    bg: '#EEF2FF',
    border: '#C7D2FE',
    fieldsFactory: (data, update) => ([
      {
        key: 'inputName',
        label: 'Name',
        value: data?.inputName ?? (data?.id?.replace('customInput-', 'input_') || ''),
        onChange: (v) => update('inputName', v),
      },
      {
        key: 'inputType',
        label: 'Type',
        value: data?.inputType ?? 'Text',
        onChange: (v) => update('inputType', v),
      },
    ]),
    handles: { inputs: [], outputs: [{ id: 'value' }] },
  },

  llm: {
    title: 'LLM',
    color: '#9A3412',
    bg: '#FFF7ED',
    border: '#FED7AA',
    fieldsFactory: () => [],
    handles: {
      inputs: [{ id: 'system', top: '33%' }, { id: 'prompt', top: '66%' }],
      outputs: [{ id: 'response' }],
    },
  },

  customOutput: {
    title: 'Output',
    color: '#065F46',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    fieldsFactory: (data, update) => ([
      {
        key: 'outputName',
        label: 'Name',
        value: data?.outputName ?? (data?.id?.replace('customOutput-', 'output_') || ''),
        onChange: (v) => update('outputName', v),
      },
      {
        key: 'outputType',
        label: 'Type',
        value: data?.outputType ?? 'Text',
        onChange: (v) => update('outputType', v),
      },
    ]),
    handles: { inputs: [{ id: 'value' }], outputs: [] },
  },

  // -------- Five new nodes (config-only) --------
  http: {
    title: 'HTTP Request',
    color: '#075985',
    bg: '#E0F2FE',
    border: '#BAE6FD',
    fieldsFactory: (data, update) => ([
      { key: 'method', label: 'Method', value: data?.method ?? 'GET', onChange: (v) => update('method', v) },
      { key: 'url', label: 'URL', value: data?.url ?? '', onChange: (v) => update('url', v) },
    ]),
    handles: { inputs: [{ id: 'body', top: '60%' }], outputs: [{ id: 'response' }] },
  },

  map: {
    title: 'Map',
    color: '#92400E',
    bg: '#FEF3C7',
    border: '#FDE68A',
    fieldsFactory: (data, update) => ([
      { key: 'expr', label: 'Expression', value: data?.expr ?? 'x => x', onChange: (v) => update('expr', v) },
    ]),
    handles: { inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] },
  },

  filter: {
    title: 'Filter',
    color: '#9D174D',
    bg: '#FCE7F3',
    border: '#FBCFE8',
    fieldsFactory: (data, update) => ([
      { key: 'predicate', label: 'Predicate', value: data?.predicate ?? 'x => true', onChange: (v) => update('predicate', v) },
    ]),
    handles: { inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] },
  },

  delay: {
    title: 'Delay',
    color: '#1E40AF',
    bg: '#EFF6FF',
    border: '#DBEAFE',
    fieldsFactory: (data, update) => ([
      { key: 'ms', label: 'Milliseconds', value: data?.ms ?? '500', onChange: (v) => update('ms', v) },
    ]),
    handles: { inputs: [{ id: 'in' }], outputs: [{ id: 'out' }] },
  },

  join: {
    title: 'Join',
    color: '#155E75',
    bg: '#ECFEFF',
    border: '#A5F3FC',
    fieldsFactory: () => [],
    handles: { inputs: [{ id: 'a', top: '40%' }, { id: 'b', top: '70%' }], outputs: [{ id: 'out' }] },
  },
};
