import React, {Component} from 'react';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
  static navigationOptions = {
    title: 'React-Native',
  };

  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  componentDidMount() {
    // Metodo faz a montagem automaticamente assim que é chamado na tela
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`); // Async / Await
    const {docs, ...productInfo} = response.data; // Desestruturação

    // Setando valor para o objeto "docs" criado no state acima - Obs: sobrescreve os valores
    // this.setState({docs, productInfo});

    //Para não sobreescrever podemos usar da seguinte forma
    this.setState({docs: [...this.state.docs, ...docs], productInfo, page}); // Uma forma de unir 2 arays dentro do setState
  };

  loadMore = () => {
    const {page, productInfo} = this.state; // Desestruturação

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  renderItem = ({item}) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productsDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate('Product', {product: item});
        }}>
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list} // estilo
          data={this.state.docs} //Recebe infos do docs
          keyExtractor={item => item._id} //key unica
          renderItem={this.renderItem} // Chama a funcao passando item por item
          onEndReached={this.loadMore} //quando estiver chegando no final da pagina ele chama a funcao "loadMore"
          onEndReachedThreshold={0.1} //define o procentual faltante para mostrar a proxima pagina "OBS: em numero decimal"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderWidth: 20,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productsDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'trasparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  },
});
