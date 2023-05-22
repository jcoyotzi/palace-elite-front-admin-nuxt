/**
 * @interface UseCase
 * @template <T>
 * @description Orchestrates through stages to evaluate its content
 */
export default interface UseCase<P, T> {
  /**
   * @function execute
   * @param {P} port
   * @return {Promise<T>}
   * @description executes Class responsibility
   */
  run(port: P): Promise<T>
}
