import React, { useEffect, useState } from 'react';
import { Button, Space, Upload } from '@byonedot/web-react';
import { IconUser } from '@byonedot/web-react/icon';
import ky from 'ky';

function App() {
  const [cssStatus, setCssStatus] = useState('loading');
  useEffect(() => {
    ky('/main.css')
      .text()
      .then((content) => {
        const hasSuzumeClasses = /\.suzume-/.test(content);
        const hasFontFace = /@font-face/.test(content);
        setCssStatus(
          `classes=${hasSuzumeClasses ? 'ok' : 'MISSING'} font-face=${
            hasFontFace ? 'present (removeFontFace is off)' : 'removed (removeFontFace: true)'
          }`
        );
      })
      .catch(() => setCssStatus('FAILED to load /main.css'));
  });
  return (
    <div style={{ padding: 20 }}>
      <ol>
        <Space direction="vertical" size="large">
          <li>
            <p>The button below should be rendered with Suzume Design styles:</p>
            <Button type="primary">Button</Button>
          </li>
          <li>
            <p>
              The compiled CSS should contain <code>.suzume-*</code> selectors, and with
              <code>removeFontFace: true</code> no <code>@font-face</code> rule should remain:
            </p>
            <pre>{cssStatus}</pre>
          </li>
          <li>
            <p>This upload component should display Japanese (defaultLanguage: &apos;ja-JP&apos;):</p>
            <Upload />
          </li>
          <li>
            <p>This icon should render through the on-demand icon pipeline:</p>
            <IconUser style={{ fontSize: 40 }} />
          </li>
        </Space>
      </ol>
    </div>
  );
}

export default App;
