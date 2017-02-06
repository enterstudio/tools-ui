
function chainedSaveHistory(domain) {
  return (result) => {
    const { errors, warnings } = result;
    const hasErrors = (errors && errors.length);
    const hasWarnings = (warnings && warnings.length);
    let status = 'valid';

    if (hasWarnings) { status = 'warning'; }
    if (hasErrors) { status = 'error'; }

    return saveHistory(domain, status);
  };
}

export function saveHistory(domain, status) {
  return {
    type: 'SPARKPOST_API_REQUEST',
    meta: {
      url: '/messaging-tools/spf/history',
      method: 'post',
      data: { domain, status },
      types: ['SPF_SAVE_HISTORY_PENDING', 'SPF_SAVE_HISTORY_SUCCESS', 'SPF_SAVE_HISTORY_FAIL']
    }
  };
}

export function inspect(domain) {
  return {
    type: 'SPARKPOST_API_REQUEST',
    meta: {
      url: '/messaging-tools/spf/query',
      params: { domain },
      types: ['SPF_INSPECT_PENDING', 'SPF_INSPECT_SUCCESS', 'SPF_INSPECT_FAIL'],
      chain: {
        success: chainedSaveHistory(domain)
      }
    }
  };
}

export function expandAll() {
  return { type: 'SPF_INSPECT_EXPAND_ALL' };
}

export function collapseAll() {
  return { type: 'SPF_INSPECT_COLLAPSE_ALL' };
}

export function expand(id) {
  return { type: 'SPF_INSPECT_EXPAND', payload: id };
}

export function collapse(id) {
  return { type: 'SPF_INSPECT_COLLAPSE', payload: id };
}

export function getHistory() {
  return {
    type: 'SPARKPOST_API_REQUEST',
    meta: {
      method: 'GET',
      url: '/messaging-tools/spf/history',
      types: ['SPF_HISTORY_PENDING', 'SPF_HISTORY_SUCCESS', 'SPF_HISTORY_FAIL']
    }
  };
}
