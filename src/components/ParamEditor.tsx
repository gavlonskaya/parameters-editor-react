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
  onAddParam: (newParam: Param) => void;
  onRemoveParam: (paramId: number) => void;
}

interface State {
  editedModel: Model;
  newParamName: string;
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editedModel: { ...props.model },
      newParamName: "",
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

  handleAddParam = () => {
    const { editedModel, newParamName } = this.state;
    const { params, onAddParam } = this.props;

    const newParamId = Math.max(...params.map((param) => param.id), 0) + 1;

    const newParam: Param = {
      id: newParamId,
      name: newParamName,
      type: "string",
    };

    onAddParam(newParam);

    const updatedParams = [...params, newParam];

    const newParamValue: ParamValue = {
      paramId: newParamId,
      value: "",
    };

    const updatedParamValues = [...editedModel.paramValues, newParamValue];

    this.setState({
      editedModel: {
        ...editedModel,
        paramValues: updatedParamValues,
      },
      newParamName: "",
    });
  };

  handleRemoveParam = (paramId: number) => {
    const { editedModel } = this.state;
    const { params, onRemoveParam } = this.props;
    const updatedParams = params.filter((param) => param.id !== paramId);
    const updatedParamValues = editedModel.paramValues.filter(
      (paramValue) => paramValue.paramId !== paramId
    );

    this.setState({
      editedModel: {
        ...editedModel,
        paramValues: updatedParamValues,
      },
    });
    onRemoveParam(paramId);
  };

  handleSave = () => {
    const { onUpdateModel } = this.props;
    onUpdateModel(this.state.editedModel);
  };

  render() {
    const { params } = this.props;
    const { editedModel, newParamName } = this.state;

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
            <button onClick={() => this.handleRemoveParam(param.id)}>
              Удалить
            </button>
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Имя нового параметра"
            value={newParamName}
            onChange={(e) => this.setState({ newParamName: e.target.value })}
          />
          <button onClick={this.handleAddParam}>Добавить</button>
        </div>
        <button onClick={this.handleSave}>Сохранить</button>
      </div>
    );
  }
}

export default ParamEditor;
