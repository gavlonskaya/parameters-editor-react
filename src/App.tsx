import React, { Component } from "react";
import ParamEditor from "./components/ParamEditor";

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

class App extends Component {
  params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: "string",
    },
    {
      id: 2,
      name: "Длина",
      type: "string",
    },
  ];

  initialModel: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  };

  state = {
    model: { ...this.initialModel },
  };

  handleUpdateModel = (updatedModel: Model) => {
    this.setState({ model: updatedModel });
  };

  handleAddParam = (newParam: Param) => {
    this.params.push(newParam);

    this.setState({ params: [...this.params] });
  };

  handleRemoveParam = (paramId: number) => {
    this.params = this.params.filter((param) => param.id !== paramId);
    this.setState({ params: [...this.params] });
  };

  render() {
    return (
      <div>
        <h1>Редактор параметров</h1>
        <ParamEditor
          params={this.params}
          model={this.state.model}
          onUpdateModel={this.handleUpdateModel}
          onAddParam={this.handleAddParam}
          onRemoveParam={this.handleRemoveParam}
        />
        <div>
          <h2>Модель:</h2>
          <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
        </div>
      </div>
    );
  }
}

export default App;
