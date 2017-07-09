import React from 'react';
import { observer } from 'mobx-react';

import Input from '../BaseForm/components/inputs/SimpleInput';
import FormControls from '../BaseForm/components/controls/FormControls';

export default observer(({ form }) => (
  <form>
    <h2 className="light-red">Form Login</h2>
    <Input field={form.$('email')} />
    <Input field={form.$('password')} type="password" />
    <FormControls form={form} />
  </form>
));
