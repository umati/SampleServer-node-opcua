// Copyright 2021 (c) Andreas Heine
//
//   Licensed under the Apache License, Version 2.0 (the 'License');
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an 'AS IS' BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import { 
    AddressSpace,
    UAObjectType,
    DataType,
    coerceLocalizedText
} from 'node-opcua'

export const createOwnServerAddressspace = async (addressSpace: AddressSpace): Promise<void> => {
    const namespace = addressSpace?.getOwnNamespace()
    const diIdx = addressSpace?.getNamespaceIndex('http://opcfoundation.org/UA/DI/')
    
    const softwareType = addressSpace?.findNode(`ns=${diIdx};i=15106`) as UAObjectType
    const software = softwareType?.instantiate({
        browseName: 'SoftwareType',
        organizedBy: addressSpace.rootFolder.objects,
    })
    const model = software?.getPropertyByName('Model')
    model?.setValueFromSource({
        value: coerceLocalizedText('SampleServer-node-opcua'),
        dataType: DataType.LocalizedText,
    })

    const manufacturer = software?.getPropertyByName('Manufacturer')
    manufacturer?.setValueFromSource({
        value: coerceLocalizedText('Andreas Heine'),
        dataType: DataType.LocalizedText,
    })
    const softwareRevision = software?.getPropertyByName('SoftwareRevision')
    softwareRevision?.setValueFromSource({
        value: 'v1.0.0',
        dataType: DataType.String,
    })
}