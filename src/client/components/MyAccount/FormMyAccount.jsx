import React from 'react';
import { observer } from 'mobx-react';

import Input from '../BaseForm/components/inputs/SimpleInput';
// import FormControls from '../BaseForm/components/controls/FormControls';

export default observer(({ form }) => (
  <form>
    <h2 className="light-red">My Account</h2>
    <Input field={form.$('firstName')} />
    <Input field={form.$('lastName')} />
  </form>
));
