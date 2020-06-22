import path from "path";

/**
 * @param relativePath if undefined, workspace path will be returned
 */
export function getWorkspacePath(relativePath: string|undefined = undefined): string {
    const workspaceDir = process.env[`GITHUB_WORKSPACE`];
    if (workspaceDir === undefined) {
        throw new Error('GITHUB_WORKSPACE env variable is not set. Did you perform checkout action?')
    }
    return relativePath
        ? path.join(workspaceDir, relativePath)
        : workspaceDir;
}