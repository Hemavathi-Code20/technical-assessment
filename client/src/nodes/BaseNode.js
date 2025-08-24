import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

export default function BaseNode({ id, data }) {
  const {
    title = 'Node',
    subtitle,
    color = '#1C2536',
    bg = '#ffffff',
    border = '#e5e7eb',
    fields = [], 
    handles = { inputs: [], outputs: [] }, 
  } = data || {};

  return (
    <div className="vs-node" style={{ background: bg, borderColor: border }}>
      <div className="vs-node-header" style={{ color }}>
        <div className="vs-node-title">{title}</div>
        {subtitle && <div className="vs-node-subtitle">{subtitle}</div>}
      </div>

      {fields?.length > 0 && (
        <div className="vs-node-body">
          {fields.map((f) => (
            <div key={f.key} className="vs-field">
              {f.label && <label className="vs-label">{f.label}</label>}
              {f.type === 'textarea' ? (
                <textarea
                  className="vs-input"
                  rows={3}
                  value={f.value ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => f.onChange?.(e.target.value)}
                />
              ) : (
                <input
                  className="vs-input"
                  type={f.type || 'text'}
                  value={f.value ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => f.onChange?.(e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {handles?.inputs?.map((h) => (
        <Handle
          key={h.id}
          id={h.id}
          type="target"
          position={Position.Left}
          style={{ top: h.top ?? '50%' }}
        />
      ))}
      {handles?.outputs?.map((h) => (
        <Handle
          key={h.id}
          id={h.id}
          type="source"
          position={Position.Right}
          style={{ top: h.top ?? '50%' }}
        />
      ))}
    </div>
  );
}
