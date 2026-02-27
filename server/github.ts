import { z } from "zod";
import { router, protectedProcedure } from "./_core/trpc";
import axios from "axios";

export const githubRouter = router({
  listRepos: protectedProcedure.query(async ({ ctx }) => {
    // Usaremos o teu token do GitHub (que deve estar no .env)
    const token = process.env.GITHUB_TOKEN;
    
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `token ${token}`,
        },
        params: {
          sort: "updated",
          per_page: 10
        }
      });
      
      return response.data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        updatedAt: repo.updated_at
      }));
    } catch (error) {
      console.error("Erro ao listar repositórios:", error);
      return [];
    }
  }),
});
