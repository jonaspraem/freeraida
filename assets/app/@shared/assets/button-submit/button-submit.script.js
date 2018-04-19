(function() {
    var resize;

    $("div").click(function() {
        if ($("div").hasClass("loading-start")) {
            if ($("div").hasClass("loading-end")) {
                return $("div").attr("class", "");
            }
        } else {
            setTimeout((function() {
                return $("div").addClass("loading-start");
            }), 0);
            setTimeout((function() {
                return $("div").addClass("loading-progress");
            }), 500);
            return setTimeout((function() {
                return $("div").addClass("loading-end");
            }), 1500);
        }
    });

    resize = function() {
        return $("body").css({
            "margin-top": ~~((window.innerHeight - 260) / 2) + "px"
        });
    };

    $(window).resize(resize);

    resize();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLENBQUEsQ0FBRSxLQUFGLENBQVEsQ0FBQyxLQUFULENBQWUsUUFBQSxDQUFBLENBQUE7SUFDYixJQUFHLENBQUEsQ0FBRSxLQUFGLENBQVEsQ0FBQyxRQUFULENBQWtCLGVBQWxCLENBQUg7TUFDRSxJQUFHLENBQUEsQ0FBRSxLQUFGLENBQVEsQ0FBQyxRQUFULENBQWtCLGFBQWxCLENBQUg7ZUFDRSxDQUFBLENBQUUsS0FBRixDQUFRLENBQUMsSUFBVCxDQUFjLE9BQWQsRUFBdUIsRUFBdkIsRUFERjtPQURGO0tBQUEsTUFBQTtNQUlFLFVBQUEsQ0FBVyxDQUFDLFFBQUEsQ0FBQSxDQUFBO2VBQUcsQ0FBQSxDQUFFLEtBQUYsQ0FBUSxDQUFDLFFBQVQsQ0FBa0IsZUFBbEI7TUFBSCxDQUFELENBQVgsRUFBMEQsQ0FBMUQ7TUFDQSxVQUFBLENBQVcsQ0FBQyxRQUFBLENBQUEsQ0FBQTtlQUFHLENBQUEsQ0FBRSxLQUFGLENBQVEsQ0FBQyxRQUFULENBQWtCLGtCQUFsQjtNQUFILENBQUQsQ0FBWCxFQUF3RCxHQUF4RDthQUNBLFVBQUEsQ0FBVyxDQUFDLFFBQUEsQ0FBQSxDQUFBO2VBQUcsQ0FBQSxDQUFFLEtBQUYsQ0FBUSxDQUFDLFFBQVQsQ0FBa0IsYUFBbEI7TUFBSCxDQUFELENBQVgsRUFBdUQsSUFBdkQsRUFORjs7RUFEYSxDQUFmOztFQVNBLE1BQUEsR0FBUyxRQUFBLENBQUEsQ0FBQTtXQUNQLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQ0U7TUFBQSxZQUFBLEVBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBUCxHQUFxQixHQUF0QixDQUFBLEdBQTZCLENBQTlCLENBQUYsR0FBcUM7SUFBbkQsQ0FERjtFQURPOztFQUlULENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQWlCLE1BQWpCOztFQUNBLE1BQUEsQ0FBQTtBQWRBIiwic291cmNlc0NvbnRlbnQiOlsiJChcImRpdlwiKS5jbGljayAtPlxuICBpZiAkKFwiZGl2XCIpLmhhc0NsYXNzIFwibG9hZGluZy1zdGFydFwiXG4gICAgaWYgJChcImRpdlwiKS5oYXNDbGFzcyBcImxvYWRpbmctZW5kXCJcbiAgICAgICQoXCJkaXZcIikuYXR0cihcImNsYXNzXCIsIFwiXCIpXG4gIGVsc2VcbiAgICBzZXRUaW1lb3V0ICgtPiAkKFwiZGl2XCIpLmFkZENsYXNzKFwibG9hZGluZy1zdGFydFwiKSkgICAsICAgIDBcbiAgICBzZXRUaW1lb3V0ICgtPiAkKFwiZGl2XCIpLmFkZENsYXNzKFwibG9hZGluZy1wcm9ncmVzc1wiKSksICA1MDBcbiAgICBzZXRUaW1lb3V0ICgtPiAkKFwiZGl2XCIpLmFkZENsYXNzKFwibG9hZGluZy1lbmRcIikpICAgICAsIDE1MDBcblxucmVzaXplID0gLT5cbiAgJChcImJvZHlcIikuY3NzXG4gICAgXCJtYXJnaW4tdG9wXCI6IH5+KCh3aW5kb3cuaW5uZXJIZWlnaHQgLSAyNjApIC8gMikgKyBcInB4XCJcbiAgICBcbiQod2luZG93KS5yZXNpemUgcmVzaXplXG5yZXNpemUoKVxuIl19
//# sourceURL=coffeescript