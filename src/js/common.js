function open (title, message) {
  this.$alert(message, title, {
    confirmButtonText: '确定'
  })
}

export default open
