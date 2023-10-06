import React, { Component } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
  onUpdateModel: (model: Model) => void;
}

interface State {
  editedModel: Model;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editedModel: { ...props.model },
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    const { editedModel } = this.state;
    const paramIndex = editedModel.paramValues.findIndex(
      (param) => param.paramId === paramId
    );

    if (paramIndex !== -1) {
      const updatedParamValues = [...editedModel.paramValues];
      updatedParamValues[paramIndex] = { paramId, value };
      this.setState({
        editedModel: {
          ...editedModel,
          paramValues: updatedParamValues,
        },
      });
    }
  };

  handleSave = () => {
    const { onUpdateModel } = this.props;
    onUpdateModel(this.state.editedModel);
  };

  render() {
    const { params } = this.props;
    const { editedModel } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}: </label>
            <input
              type="text"
              value={
                editedModel.paramValues.find(
                  (paramValue) => paramValue.paramId === param.id
                )?.value || ""
              }
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={this.handleSave}>Сохранить</button>
      </div>
    );
  }
}

export default ParamEditor;
