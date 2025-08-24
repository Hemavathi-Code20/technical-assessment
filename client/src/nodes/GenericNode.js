import { useMemo } from 'react';
import { useStore } from '../store';
import BaseNode from './BaseNode';
import { nodePresets } from './presets';

export default function GenericNode({ id, data, type }) {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const preset = nodePresets[type] || nodePresets.customInput;

  const update = (key, value) => updateNodeField(id, key, value);

  const fields = useMemo(() => {
    return preset.fieldsFactory ? preset.fieldsFactory({ ...data, id }, update) : [];
  }, [data]);

  return (
    <BaseNode
      id={id}
      data={{
        title: preset.title,
        subtitle: preset.subtitle,
        color: preset.color,
        bg: preset.bg,
        border: preset.border,
        fields,
        handles: {
          inputs: (preset.handles?.inputs || []).map((h) => ({
            id: `${id}-${h.id}`,
            top: h.top,
          })),
          outputs: (preset.handles?.outputs || []).map((h) => ({
            id: `${id}-${h.id}`,
            top: h.top,
          })),
        },
      }}
    />
  );
}
