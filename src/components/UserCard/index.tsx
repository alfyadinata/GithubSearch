import React, { useState } from "react";
import {
  Typography,
  Button,
  CircularProgress,
    Card,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core";
import { GitHub as GitHubIcon } from "@material-ui/icons";
import Api from "../../utils/Api";

interface User {
    login: string;
    html_url: string;
  }
  
  interface Repository {
    name: string;
    html_url: string;
  }
  
  interface UserCardProps {
    user: User;
  }
  
 const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [expandedUser, setExpandedUser] = useState("");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const getUserRepositories = async (username: string) => {
      if (expandedUser === username) {
        setExpandedUser("");
        return;
      }
  
      setLoading(true);
      setError("");
  
      try {
        const response = await Api.get(`/users/${username}/repos`);
        const repositoriesData = response.data;
        setExpandedUser(username);
        setRepositories(repositoriesData);
        if (repositoriesData.length === 0) {
          setError("No repositories found for the selected user.");
        }
      } catch (error) {
        setError("Error getting user repositories. Please try again later.");
        console.error("Error getting user repositories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Card key={user.login} variant="outlined">
        <CardContent>
          <Typography
            variant="body1"
            component="a"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.login}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<GitHubIcon />}
            onClick={() => getUserRepositories(user.login)}
            disabled={loading}
          >
            {expandedUser === user.login ? "Hide Repositories" : "Show Repositories"}
          </Button>
        </CardActions>
        <Collapse in={expandedUser === user.login} timeout="auto" unmountOnExit>
          <CardContent>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
              <>
                {repositories.length === 0 ? (
                  <Typography>No repositories found for the selected user.</Typography>
                ) : (
                  repositories.map((repo) => (
                    <Card key={repo.name} variant="outlined">
                      <CardContent>
                        <Typography
                          variant="body1"
                          component="a"
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}
          </CardContent>
        </Collapse>
      </Card>
    );
  };
  
  export default UserCard
  