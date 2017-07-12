import React from 'react';
import { observer } from 'mobx-react';

import Input from '../BaseForm/components/inputs/SimpleInput';
import Checkbox from '../BaseForm/components/inputs/SimpleCheckbox';
import FormControls from '../BaseForm/components/controls/FormControls';
import Select from '../BaseForm/components/inputs/SimpleSelect';

export default observer(({ form }) => (
  <form>
    <h2 className="light-red">Form Register</h2>

    <Input field={form.$('firstName')} />
    <Input field={form.$('lastName')} />
    <Select field={form.$('gender')} />
    <Input field={form.$('username')} />
    <Input field={form.$('email')} />
    <Input field={form.$('emailConfirm')} />
    <Input field={form.$('password')} type="password" />
    <Input field={form.$('passwordConfirm')} type="password" />
    <Checkbox field={form.$('terms')} />
    <FormControls form={form} />
  </form>
));
