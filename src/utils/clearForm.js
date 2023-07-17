function clearForm(e) {
        for (let i = 0; i < e.target.length; i++) {
          e.target[i].value = '';
        }
}

export default clearForm