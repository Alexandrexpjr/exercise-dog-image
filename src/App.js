import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogObj: undefined,
      loading: true,
      storedDogs: [],
    }
    this.saveDog = this.saveDog.bind(this);
    this.renderDogElement = this.renderDogElement.bind(this);
  }

  async fetchDog() {
    this.setState({ loading: true }, 
    async () => {
      console.log('fetchou')
      const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
      const requestObject = await requestReturn.json();
      this.setState({
        loading: false,
        dogObj: requestObject,
      });
    });
  }

  componentDidMount() {
    console.log('did mount')
    this.fetchDog();
  }

  shouldComponentUpdate(_nextProps, { dogObj }) {
    console.log(dogObj);
    if (!dogObj) return true;
    return (!dogObj.message.includes('terrier'));
  }

  componentDidUpdate() {
    const { dogObj, loading } = this.state;
    if (dogObj && !loading) {
      const dogRace = dogObj.message.split('/');
      alert(dogRace[4]);
    };
  }

  saveDog() {
    this.setState(({ storedDogs, dogObj }) => ({
      storedDogs: [...storedDogs, dogObj ]
    }))
    this.fetchDog();
  }

  renderDogElement() {
    return (
      <div>
        <img src={this.state.dogObj.message} alt="dog" width="300px" />
      </div>
    );
  }

  render() {
    const { loading, storedDogs } = this.state;
    const loadingElement = <span>Loading...</span>;
    return (
      <div>
        <button type="button" onClick={this.saveDog}>
          Salvar cachorro!
        </button>
        {loading ? loadingElement : this.renderDogElement() }
        <div>
          {storedDogs.map(({ message }, index ) => (<img key={index} src={message} alt="dog" width="300px" />))}
        </div>
      </div>
    )
  }
}

export default App;
