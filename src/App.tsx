import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import UserCard from "./components/UserCard";
import Api from "./utils/Api";

interface User {
  login: string;
  html_url: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUsers = async () => {
    if (searchQuery.trim() === "") {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await Api.get(
        `/search/users?q=${searchQuery}&per_page=5`
      );
      const usersData = response.data.items;
      setUsers(usersData);
      if (usersData.length === 0) {
        setError("No users found with the provided username.");
      }
    } catch (error) {
      setError("Error searching users. Please try again later.");
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      searchUsers();
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Search Github Users and Repositories
      </Typography>
      <TextField
        label="Enter a username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={searchUsers}
        style={{width:"100%", marginBottom:"20px"}}
        disabled={loading || searchQuery.trim() === ""}
      >
        Search
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {users.map((user) => (
        <UserCard key={user.login} user={user} />
      ))}
    </Container>
  );
};

export default App
