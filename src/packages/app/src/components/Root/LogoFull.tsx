/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import MyCustomLogoFull from './logo/stone-big.png';

const imgStyle = {"width": "150px", "margin-left": "5px", "margin-top": "-10px"}

const LogoFull = () => {
  return <img src={MyCustomLogoFull} style={imgStyle}/>;
};

export default LogoFull;
