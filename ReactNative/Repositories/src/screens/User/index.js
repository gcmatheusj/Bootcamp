import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(2);

  async function getStarredRepositories() {
    setLoading(true);

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);

    setStars(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getStarredRepositories();
  }, []);

  async function loadMoreStarredRepositories() {
    setLoadingMore(true);

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    setStars([...stars, ...response.data]);
    setPage(page + 1);
    setLoadingMore(false);
  }

  function renderFooter() {
    if (!loadingMore) {
      return null;
    }

    return (
      <Loading>
        <ActivityIndicator color="#039be5" size="small" />
      </Loading>
    );
  }

  const user = navigation.getParam('user');

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <Loading>
          <ActivityIndicator color="#039be5" size="large" />
        </Loading>
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onRefresh={getStarredRepositories}
          refreshing={loading}
          onEndReachedThreshold={0.2}
          onEndReached={loadMoreStarredRepositories}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
