import React from 'react';
import { observer } from 'mobx-react';
import Button from '../Button';
import $ from '../styles';

export default observer(({ form, controls = null }) => {
  let config = {
    onSubmit: {
      enabled: true,
      text: 'Submit',
    },
    onClear: {
      enabled: true,
      text: 'Clear',
    },
    onReset: {
      enabled: true,
      text: 'Reset',
    },
  };

  config = Object.assign(config, controls || {});

  return (
    <div className="tc tl-ns mt2">

      {(!controls || config.onSubmit) &&
        <Button
          type="submit"
          className={$.ctrl}
          onClick={form.onSubmit}
          content={(form.submitting || form.validating)
                    ? <b><i className="fa fa-spinner fa-spin" /></b>
                    : <b><i className="fa fa-dot-circle-o" /> { config.onSubmit.text }</b>}
        />}

      {(!controls || config.onClear) &&
        <Button
          text={config.onClear.text}
          icon="eraser"
          className={$.ctrl}
          onClick={form.onClear}
        />}

      {(!controls || config.onReset) &&
        <Button
          text={config.onClear.text}
          icon="refresh"
          className={$.ctrl}
          onClick={form.onReset}
        />}

      <div className="f6 db red">
        {form.error}
      </div>

    </div>
  );
});
